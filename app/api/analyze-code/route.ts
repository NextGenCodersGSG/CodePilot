import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, language } = await req.json();
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 }
      );
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

    const prompt = `
        As a senior ${language} developer, analyze this code and provide:
        1. Performance Issues - Identify optimizations with specific solutions
        2. Security Issues - Highlight vulnerabilities with remediation steps
        3. Bugs - Find errors with fixes
        4. Code Summary - Brief technical overview
        5. Suggested Solutions - Key implementation recommendations

        Format as JSON with keys:
        - "title" (string) - A short, descriptive title for this analysis
        - "slug" (string) - A URL-friendly identifier based on the title (lowercase, hyphen-separated)
        - "performance_issues" (array of objects with "issue", "solution", and "severity")
        - "security_issues" (array of objects with "vulnerability", "fix", and "severity")
        - "bugs" (array of objects with "error", "correction", and "severity")
        - "description" (string) - A concise summary of the code
        - "overall_suggestions" (array of strings) - Key recommendations for improvement

        Code:
        """${code}"""

        Rules:
        1. JSON structure must be valid
        2. Include concrete solutions with code examples when applicable
        3. Prioritize critical issues first
        4. Use ${language}-specific best practices
        5. Solutions should be actionable and concise
        6. Avoid markdown formatting
        7. Assign severity levels to all issues (high/medium/low)
        8. Ensure "title" and "slug" are informative and correctly formatted
        
        Example format:
        {
          "title": "Optimizing Database Queries in Node.js",
          "slug": "optimizing-database-queries-nodejs",
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
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-0125-preview", // Use a model that supports JSON mode
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 2048,
        response_format: { type: "json_object" } // Enforce JSON output
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch data from OpenAI API" },
        { status: 502 }
      );
    }

    const responseData = await response.json();
    const jsonResponse = responseData.choices[0]?.message?.content;

    if (!jsonResponse) {
      console.error("Empty content in API response");
      return NextResponse.json(
        { error: "Unexpected API response format" },
        { status: 502 }
      );
    }

    const cleanedJson = jsonResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const parsedContent = JSON.parse(cleanedJson);
      return NextResponse.json(parsedContent, { status: 200 });
    } catch {
      console.error(
        "6 - Failed to parse JSON content. Raw response:",
        jsonResponse
      );
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
