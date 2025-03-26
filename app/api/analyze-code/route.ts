import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { code,language } = await req.json();
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

        if (!OPENAI_API_KEY) {
            return NextResponse.json({ error: "API key is missing" }, { status: 500 });
        }

        if (!code) {
            return NextResponse.json({ error: "Code is required" }, { status: 400 });
        }

        if (!language) {
            return NextResponse.json(
                { error: "Programming language is required" },
                { status: 400 }
            );
        }
        
        // Validate against supported languages
        const validLanguages = [
            "TypeScript",
            "JavaScript",
            "React",
            "Python",
            "Java",
            "C#",
            "Rust"
        ];
        
        if (!validLanguages.includes(language)) {
            return NextResponse.json(
                { error: "Unsupported programming language" },
                { status: 400 }
            );
        }

        console.log("1 - Received code input");

        const prompt = `
        As a senior ${language} developer, analyze this code and provide:
        1. Performance Issues - Identify optimizations with specific solutions
        2. Security Issues - Highlight vulnerabilities with remediation steps
        3. Bugs - Find errors with fixes
        4. Code Summary - Brief technical overview
        5. Suggested Solutions - Key implementation recommendations
        
        Format as JSON with keys:
        - "performance_issues" (array of objects with "issue" and "solution")
        - "security_issues" (array of objects with "vulnerability" and "fix")
        - "bugs" (array of objects with "error" and "correction")
        - "description" (string)
        - "overall_suggestions" (array of strings)
        
        Code:
        """${code}"""
        
        Rules:
        1. JSON structure must be valid
        2. Include concrete solutions with code examples when applicable
        3. Prioritize critical issues first
        4. Use ${language}-specific best practices
        5. Solutions should be actionable and concise
        6. Avoid markdown formatting
        7. Technical severity level for each issue (high/medium/low)
        
        Example format:
        {
          "performance_issues": [
            {
              "issue": "N+1 database queries in loop",
              "solution": "Implement batch loading using ${language}'s ...",
              "severity": "high"
            }
          ],
          "bugs": [
            {
              "error": "Undefined variable 'count'",
              "correction": "Initialize variable: let count = 0",
              "severity": "medium"
            }
          ],
          "description": "...",
          "overall_suggestions": ["Refactor component to use memoization", ...]
        }
        `;

        const response = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4-0125-preview", // Use a model that supports JSON mode
                messages: [{ role: "user", content: prompt }],
                temperature: 0.2,
                max_tokens: 2048,
                response_format: { type: "json_object" } // Enforce JSON output
            }),
        });

        console.log("2 - Fetched response from OpenAI");

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenAI API Error:", errorData);
            return NextResponse.json(
                { error: "Failed to fetch data from OpenAI API" },
                { status: 502 }
            );
        }

        console.log("3 - Reading response stream");
        console.log(response);
        
        const responseData = await response.json();
        console.log("4 - Parsing JSON content");

        const jsonResponse = responseData.choices[0]?.message?.content;

        if (!jsonResponse) {
            console.error("Empty content in API response");
            return NextResponse.json(
                { error: "Unexpected API response format" },
                { status: 502 }
            );
        }

        // Clean response from markdown code blocks
        const cleanedJson = jsonResponse
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        try {
            const parsedContent = JSON.parse(cleanedJson);
            console.log("5 - Successfully parsed JSON content");
            return NextResponse.json(parsedContent, { status: 200 });
        } catch (parseError) {
            console.error("6 - Failed to parse JSON content. Raw response:", jsonResponse);
            return NextResponse.json(
                { 
                    error: "Invalid API response format", 
                    rawResponse: jsonResponse 
                },
                { status: 502 }
            );
        }
    } catch (error) {
        console.error("7 - Internal Server Error", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}