"use client"

import { motion } from "framer-motion"
import { FileCode, Zap, AlertTriangle, Shield, Bug } from "lucide-react"
import { CodeBlock } from "@/components/documentation/code-block"
import { ExpandableCode } from "@/components/documentation/expandable-code"
import { TooltipTerm } from "@/components/documentation/tooltip-term"

export function IntegrationContent() {
  const nextjsSetupCode = `// Install required packages
npm install @codepilot/core @codepilot/react
# or
yarn add @codepilot/core @codepilot/react
# or
pnpm add @codepilot/core @codepilot/react`

  const envSetupCode = `# .env.local
OPENAI_API_KEY=your_openai_api_key_here`

  const apiRouteCode = `// app/api/code-review/route.ts
import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
  try {
    const { code, language } = await request.json();
    
    // Validate input
    if (!code || !language) {
      return NextResponse.json(
        { error: 'Code and language are required' },
        { status: 400 }
      );
    }
    
    // Create the prompt for code analysis
    const prompt = \`
      Analyze the following React code for:
      1. Performance issues
      2. Security vulnerabilities
      3. Bugs and logical errors
      4. Code quality and best practices
      
      Then provide:
      1. A clear explanation of what the code does
      2. Specific issues identified in each category
      3. Concrete suggestions for improvement with code examples
      
      Code to analyze:
      \${code}
    \`;
    
    // Generate the analysis using the AI SDK
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt,
      temperature: 0.3, // Lower temperature for more focused analysis
      maxTokens: 2048, // Adjust based on your needs
    });
    
    // Process the response to structure it
    const analysis = processAnalysisResponse(text);
    
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Code analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze code' },
      { status: 500 }
    );
  }
}

// Helper function to structure the analysis response
function processAnalysisResponse(text) {
  // In a real implementation, you would parse the text response
  // and structure it into categories (performance, security, bugs, etc.)
  // For simplicity, we're returning the raw text here
  return {
    raw: text,
    // You could add more structured fields here
  };
}`

  const streamingApiRouteCode = `// app/api/code-review-stream/route.ts
import { StreamingTextResponse, OpenAIStream } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { code, language } = await request.json();
    
    // Validate input
    if (!code || !language) {
      return new Response(
        JSON.stringify({ error: 'Code and language are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Create the prompt for code analysis
    const prompt = \`
      Analyze the following React code for:
      1. Performance issues
      2. Security vulnerabilities
      3. Bugs and logical errors
      4. Code quality and best practices
      
      Then provide:
      1. A clear explanation of what the code does
      2. Specific issues identified in each category
      3. Concrete suggestions for improvement with code examples
      
      Code to analyze:
      \${code}
    \`;
    
    // Create a streaming response
    const response = await openai('gpt-4o').complete({
      prompt,
      temperature: 0.3,
      maxTokens: 2048,
      stream: true,
    });
    
    // Convert the response to a readable stream
    const stream = OpenAIStream(response);
    
    // Return the streaming response
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Code analysis error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to analyze code' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}`

  const reactComponentCode = `// components/code-analyzer.tsx
'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, AlertTriangle, Zap, Shield, Bug } from 'lucide-react';

export function CodeAnalyzer() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  async function handleAnalyzeCode() {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/code-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze code');
      }
      
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Code Analyzer</CardTitle>
          <CardDescription>
            Paste your code below to analyze it for issues and improvements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Programming Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="jsx">React JSX</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Code
            </label>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="font-mono min-h-[200px]"
            />
          </div>
          
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <Button 
            onClick={handleAnalyzeCode} 
            disabled={loading || !code.trim()}
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Analyzing...' : 'Analyze Code'}
          </Button>
        </CardContent>
      </Card>
      
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">All Issues</TabsTrigger>
                <TabsTrigger value="performance">
                  <Zap className="mr-2 h-4 w-4" />
                  Performance
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="bugs">
                  <Bug className="mr-2 h-4 w-4" />
                  Bugs
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <div className="whitespace-pre-wrap font-mono text-sm p-4 bg-muted rounded-md">
                  {analysis.raw}
                </div>
              </TabsContent>
              
              {/* Add other tab contents for structured analysis */}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}`

  const usageCode = `// app/code-review/page.tsx
import { CodeAnalyzer } from '@/components/code-analyzer';

export default function CodeReviewPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Code Review Tool</h1>
      <CodeAnalyzer />
    </div>
  );
}`

  return (
    <div className="docs-content max-w-4xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 id="integration" className="text-foreground text-4xl font-bold mb-4">Integration Guide</h1>
        <p className="text-foreground text-lg">
          This guide will walk you through integrating CodePilot into your Next.js application. You'll learn how to set
          up the necessary API routes and frontend components to create a fully functional code review system.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12"
      >
        <h2 id="nextjs-setup" className="text-foreground text-2xl font-semibold mb-4">Next.js Implementation Details</h2>
        <p className="text-foreground mb-6">
          CodePilot is designed to work seamlessly with Next.js applications, particularly those using the App Router.
          Here's how to set up the necessary components:
        </p>

        <h3 className="text-foreground text-xl font-medium mb-3">1. Install Required Packages</h3>
        <p className="text-foreground mb-4">
          First, install the CodePilot packages and the Vercel AI SDK, which we'll use for interacting with the OpenAI
          API:
        </p>

        <CodeBlock code={nextjsSetupCode} language="bash" />

        <h3 className="text-foreground text-xl font-medium mt-8 mb-3">2. Set Up Environment Variables</h3>
        <p className="text-foreground mb-4">
          Create or update your <code className="px-1.5 py-0.5 bg-muted rounded text-sm">.env.local</code> file to include your OpenAI API key:
        </p>

        <CodeBlock code={envSetupCode} language="bash" filename=".env.local" />

        <div className="mt-6 p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900 rounded-lg">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-500 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">Security Warning</h4>
              <p className="text-foreground text-sm">
                Never commit your API keys to version control. Make sure <code className="px-1 py-0.5 bg-muted rounded text-xs">.env.local</code> is included in your{" "}
                <code className="px-1 py-0.5 bg-muted rounded text-xs">.gitignore</code> file.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h2 id="api-configuration" className="text-2xl font-semibold mb-4">API Route Configuration</h2>
        <p className="text-foreground mb-4">Next, you'll need to create API routes to handle code review requests. We'll create two routes:</p>
        <ol className="text-foreground list-decimal ml-6 mb-6 space-y-1">
          <li>A standard route for regular requests</li>
          <li>A streaming route for real-time analysis feedback</li>
        </ol> 

        <h3 className="text-foreground text-xl font-medium mb-3">Standard API Route</h3>
        <p className="text-foreground mb-4">
          Create a new file at <code className="px-1.5 py-0.5 bg-muted rounded text-sm">app/api/code-review/route.ts</code> with the following content:
        </p>

        <ExpandableCode
          title="Standard API Route Implementation"
          description="Create this file in your Next.js project"
          code={apiRouteCode}
          language="typescript"
          filename="app/api/code-review/route.ts"
          defaultExpanded={true}
          
        />

        <h3 className="text-foreground text-xl font-medium mt-8 mb-3">Streaming API Route (Optional)</h3>
        <p className="text-foreground mb-4">
          For a better user experience, you can create a streaming API route that returns results in real-time as
          they're generated:
        </p>

        <ExpandableCode
          title="Streaming API Route Implementation"
          description="Create this file for streaming responses"
          code={streamingApiRouteCode}
          language="typescript"
          filename="app/api/code-review-stream/route.ts"
        />

        <div className="mt-6 p-4 border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 rounded-lg">
          <h4 className="text-foreground font-medium mb-2">API Route Considerations</h4>
          <p className="text-foreground text-sm">
            The streaming route provides a better user experience for longer code analyses, as users see results
            incrementally instead of waiting for the entire analysis to complete. However, it requires more complex
            frontend handling.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <h2 id="text-foreground openai-implementation" className="text-2xl font-semibold mb-4">OpenAI API Implementation</h2>
        <p className="text-foreground mb-6">
          The code examples above use the{" "}
          <TooltipTerm
            term="AI SDK"
            definition="A toolkit by Vercel that provides a unified interface for working with AI models from different providers."
          >
            AI SDK
          </TooltipTerm>{" "}
          to interact with OpenAI's models. Here's a breakdown of how the implementation works:
        </p>

        <h3 className="text-foreground text-xl font-medium mb-3">Key Components</h3>
        <ol className="list-decimal ml-6 mb-6 space-y-2">
          <li>
            <span className="text-foreground font-medium">Prompt Engineering</span> - We create a detailed prompt that instructs the AI model to analyze the
            code for specific issues and provide structured feedback.
          </li>
          <li>
            <span className="text-foreground font-medium">Model Selection</span> - We use GPT-4o for its advanced code understanding capabilities, but you
            can also use GPT-3.5-Turbo for faster (though less detailed) analysis.
          </li>
          <li>
            <span className="text-foreground font-medium">Parameter Tuning</span> - We set a lower temperature (0.3) to get more focused and consistent
            results, and adjust the maximum tokens based on expected response length.
          </li>
          <li>
            <span className="text-foreground font-medium">Response Processing</span> - For more advanced implementations, you can parse the AI's response to
            extract structured data about different issue categories.
          </li>
        </ol>

        <h3 className="text-foreground text-xl font-medium mb-3">Frontend Implementation</h3>
        <p className="text-foreground mb-4">
          Now, let's create a React component that allows users to submit code for analysis and displays the results:
        </p>

        <ExpandableCode
          title="React Component Implementation"
          description="Create this component to provide a user interface for code analysis"
          code={reactComponentCode}
          language="tsx"
          filename="components/code-analyzer.tsx"
        />

        <div className="mt-6 p-4 border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 rounded-lg">
          <h4 className="text-foreground font-medium mb-2">Integration Tip</h4>
          <p className="text-foreground text-sm">
            For a production application, consider implementing more robust error handling, rate limiting, and user
            authentication to protect your API routes from abuse.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <h3 className="text-foreground text-xl font-medium mb-3">Using the Component</h3>
        <p className="text-foreground mb-4">To use the CodeAnalyzer component in your application, simply import and include it in any page:</p>

        <CodeBlock
          code={usageCode}
          language="tsx"
          filename="app/code-review/page.tsx"
        />

        <div className="mt-6 p-4 border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 rounded-lg">
          <h4 className="text-foreground font-medium mb-2">Component Customization</h4>
          <p className="text-foreground text-sm">
            The CodeAnalyzer component can be customized to fit your application's needs. You can modify the UI, add
            additional features like saving analysis results, or integrate it with your existing code editor.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 p-6 border rounded-lg bg-accent/50"
      >
        <h3 className="text-foreground text-xl font-semibold mb-4">Next Steps</h3>
        <p className="text-foreground">Now that you've integrated CodePilot into your Next.js application, you can:</p>
        <ul className="mt-4 space-y-3 pl-1">
          <li>
            <a href="/advanced-usage" className="flex items-center gap-2 text-primary hover:underline">
              <Zap className="h-4 w-4" />
              Explore advanced usage patterns
            </a>
          </li>
          <li>
            <a href="/troubleshooting" className="flex items-center gap-2 text-primary hover:underline">
              <AlertTriangle className="h-4 w-4" />
              Learn about common issues and solutions
            </a>
          </li>
          <li>
            <a href="/api-reference" className="flex items-center gap-2 text-primary hover:underline">
              <FileCode className="h-4 w-4" />
              Review the API reference documentation
            </a>
          </li>
        </ul>
      </motion.div>
    </div>
  )
}