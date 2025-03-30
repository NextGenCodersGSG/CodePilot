"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Code, Zap, CheckCircle, XCircle, Clock } from "lucide-react"
import { CodeBlock } from "@/components/documentation/code-block"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function TroubleshootingContent() {
  const apiKeyErrorCode = `// Error: Invalid API key
try {
  const analysis = await codePilot.analyzeCode({
    code,
    language,
  });
} catch (error) {
  console.error('Analysis error:', error);
  // Error message: "Error: Invalid API key or token. Please check your OpenAI API key."
}`

  const apiKeyFixCode = `// Fix: Ensure API key is correctly set
// .env.local
OPENAI_API_KEY=sk-your_valid_openai_key_here

// In your code
import { CodePilot } from '@codepilot/core';

const codePilot = new CodePilot({
  apiKey: process.env.OPENAI_API_KEY,
  // Make sure the environment variable is available in this context
});`

  const rateLimitErrorCode = `// Error: Rate limit exceeded
try {
  const analysis = await codePilot.analyzeCode({
    code,
    language,
  });
} catch (error) {
  console.error('Analysis error:', error);
  // Error message: "Error: You have exceeded your API rate limit. Please try again later."
}`

  const rateLimitFixCode = `// Fix: Implement rate limiting and retries
import { CodePilot } from '@codepilot/core';
import { sleep } from '@/lib/utils';

async function analyzeWithRetry(code, language, maxRetries = 3) {
  const codePilot = new CodePilot({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      return await codePilot.analyzeCode({
        code,
        language,
      });
    } catch (error) {
      if (error.message.includes('rate limit') && retries < maxRetries - 1) {
        // Exponential backoff: wait longer after each retry
        const waitTime = 1000 * Math.pow(2, retries);
        console.log(\`Rate limit hit. Retrying in \${waitTime / 1000} seconds...\`);
        await sleep(waitTime);
        retries++;
      } else {
        throw error;
      }
    }
  }
}`

  const tokenLimitErrorCode = `// Error: Token limit exceeded
try {
  const analysis = await codePilot.analyzeCode({
    code: veryLargeCodebase, // A very large piece of code
    language: 'javascript',
  });
} catch (error) {
  console.error('Analysis error:', error);
  // Error message: "Error: This model's maximum context length is 8192 tokens. Your input exceeded this limit."
}`

  const tokenLimitFixCode = `// Fix: Split large codebases into smaller chunks
import { CodePilot } from '@codepilot/core';

async function analyzeCodeChunks(code, language) {
  const codePilot = new CodePilot({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  // If code is too large, split it into logical chunks
  if (code.length > 10000) { // Approximate threshold
    const chunks = splitCodeIntoChunks(code, language);
    
    // Analyze each chunk separately
    const chunkResults = [];
    for (const chunk of chunks) {
      const analysis = await codePilot.analyzeCode({
        code: chunk,
        language,
      });
      chunkResults.push(analysis);
    }
    
    // Merge the results
    return mergeAnalysisResults(chunkResults);
  } else {
    // For smaller code, analyze normally
    return await codePilot.analyzeCode({
      code,
      language,
    });
  }
}

// Helper function to split code into logical chunks
function splitCodeIntoChunks(code, language) {
  // This is a simplified example - in practice, you'd want to split
  // based on logical boundaries like functions, classes, etc.
  
  // For JavaScript/TypeScript, split by function or class definitions
  if (language === 'javascript' || language === 'typescript') {
    // Split by function or class declarations
    return code.split(/\\n(function |class |const \\w+ = function|const \\w+ = \\(|export )/)
      .filter(Boolean)
      .map((chunk, i, arr) => {
        // Reattach the delimiter that was removed by split
        if (i > 0) {
          return arr[i-1].match(/\\n(function |class |const \\w+ = function|const \\w+ = \\(|export )$/)?.[1] + chunk;
        }
        return chunk;
      });
  }
  
  // For other languages, use a simpler approach
  const lines = code.split('\\n');
  const chunkSize = 300; // Approximate number of lines per chunk
  const chunks = [];
  
  for (let i = 0; i < lines.length; i += chunkSize) {
    chunks.push(lines.slice(i, i + chunkSize).join('\\n'));
  }
  
  return chunks;
}

// Helper function to merge analysis results
function mergeAnalysisResults(results) {
  // Combine the results from multiple chunks
  // This is a simplified example
  return {
    performance: results.flatMap(r => r.performance || []),
    security: results.flatMap(r => r.security || []),
    bugs: results.flatMap(r => r.bugs || []),
    explanation: results.map(r => r.explanation || '').join('\\n\\n'),
    resolution: results.flatMap(r => r.resolution || []),
  };
}`

  const timeoutErrorCode = `// Error: Request timeout
try {
  const analysis = await codePilot.analyzeCode({
    code,
    language,
  });
} catch (error) {
  console.error('Analysis error:', error);
  // Error message: "Error: Request timed out after 60 seconds."
}`

  const timeoutFixCode = `// Fix: Implement timeout handling and progressive loading
import { CodePilot } from '@codepilot/core';

// In your API route
export async function POST(request: Request) {
  try {
    const { code, language } = await request.json();
    
    // Set up a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Analysis timeout')), 30000); // 30 seconds
    });
    
    // Set up the analysis promise
    const codePilot = new CodePilot({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    const analysisPromise = codePilot.analyzeCode({
      code,
      language,
    });
    
    // Race the promises
    const analysis = await Promise.race([analysisPromise, timeoutPromise]);
    
    return NextResponse.json({ analysis });
  } catch (error) {
    if (error.message === 'Analysis timeout') {
      // Handle timeout specifically
      return NextResponse.json(
        { 
          error: 'Analysis is taking longer than expected. Try with a smaller code sample.',
          partial: true // Indicate this is a timeout response
        },
        { status: 408 }
      );
    }
    
    // Handle other errors
    console.error('Code analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze code' },
      { status: 500 }
    );
  }
}`

  return (
    <div className="docs-content">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 id="troubleshooting">Troubleshooting</h1>
        <p>
          This guide helps you diagnose and resolve common issues you might encounter when using CodePilot. We've
          compiled solutions for the most frequently reported problems to help you get back on track quickly.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 id="common-errors">Common Errors and Solutions</h2>
        <p>
          Here are the most common errors you might encounter when using CodePilot, along with their solutions:
        </p>

        <Accordion type="single" collapsible className="my-6">
          <AccordionItem value="error-1">
            <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span>"Failed to analyze code" Error</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="bg-red-500/10 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Symptoms</h3>
                  <p className="text-muted-foreground">
                    You receive a generic "Failed to analyze code" error message when trying to analyze code.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-500/10 p-2 rounded-full">
                  <Code className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Possible Causes</h3>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>Invalid API key or authentication issue</li>
                    <li>Network connectivity problems</li>
                    <li>Server-side error in the OpenAI service</li>
                    <li>Malformed request or invalid parameters</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-500/10 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Solutions</h3>
                  <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
                    <li>
                      <strong>Check your API key:</strong> Verify that your OpenAI API key is valid and correctly
                      configured in your environment variables.
                    </li>
                    <li>
                      <strong>Implement better error handling:</strong> Add more detailed error logging to identify the
                      specific cause of the failure.
                    </li>
                    <li>
                      <strong>Check your network:</strong> Ensure your server has internet connectivity and can reach the
                      OpenAI API.
                    </li>
                    <li>
                      <strong>Validate your request:</strong> Make sure your code and language parameters are valid and
                      properly formatted.
                    </li>
                  </ol>
                </div>
              </div>

              <CodeBlock
                code={`// Improved error handling
try {
  const analysis = await codePilot.analyzeCode({
    code,
    language,
  });
} catch (error) {
  // Log the full error for debugging
  console.error('Analysis error details:', {
    message: error.message,
    status: error.status,
    stack: error.stack,
  });
  
  // Provide a more helpful message to the user
  if (error.message.includes('API key')) {
    throw new Error('Authentication error. Please check your API key configuration.');
  } else if (error.message.includes('network')) {
    throw new Error('Network error. Please check your internet connection.');
  } else {
    throw new Error(\`Failed to analyze code: \${error.message}\`);
  }
}`}
                language="javascript"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="error-2">
            <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span>"Unexpected End of JSON Input" Error</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="bg-red-500/10 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Symptoms</h3>
                  <p className="text-muted-foreground">
                    You receive an "Unexpected end of JSON input" error when parsing the response from the API.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-500/10 p-2 rounded-full">
                  <Code className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Possible Causes</h3>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>Incomplete response from the API due to timeout or connection issues</li>
                    <li>Response body is not valid JSON</li>
                    <li>Response was truncated due to size limitations</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-500/10 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Solutions</h3>
                  <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
                    <li>
                      <strong>Implement robust error handling:</strong> Add try-catch blocks around JSON parsing
                      operations.
                    </li>
                    <li>
                      <strong>Use streaming responses:</strong> For large responses, use streaming to avoid timeout
                      issues.
                    </li>
                    <li>
                      <strong>Validate response format:</strong> Check that the response is valid JSON before parsing.
                    </li>
                  </ol>
                </div>
              </div>

              <CodeBlock
                code={`// Robust JSON parsing
async function fetchAnalysis(code, language) {
  try {
    const response = await fetch('/api/code-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language }),
    });
    
    // Check if the response is ok
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(\`API error: \${response.status} \${errorText}\`);
    }
    
    // Get the response text first
    const responseText = await response.text();
    
    // Check if the response is empty
    if (!responseText.trim()) {
      throw new Error('Empty response received from the server');
    }
    
    // Try to parse the JSON
    try {
      const data = JSON.parse(responseText);
      return data;
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw response:', responseText);
      throw new Error('Invalid JSON response from the server');
    }
  } catch (error) {
    console.error('Analysis request error:', error);
    throw error;
  }
}`}
                language="javascript"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="error-3">
            <AccordionTrigger className="flex items-center gap-2 text-lg font-medium">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span>Analysis Results Are Incomplete or Low Quality</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="bg-red-500/10 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Symptoms</h3>
                  <p className="text-muted-foreground">
                    The analysis results are incomplete, superficial, or don't address the specific issues in your code.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-500/10 p-2 rounded-full">
                  <Code className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Possible Causes</h3>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>Insufficient context provided with the code</li>
                    <li>Token limit constraints cutting off the analysis</li>
                    <li>Using a less capable model (e.g., GPT-3.5 instead of GPT-4)</li>
                    <li>Poorly structured prompt for the analysis</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-500/10 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Solutions</h3>
                  <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
                    <li>
                      <strong>Provide more context:</strong> Include information about the purpose of the code, the
                      project it belongs to, and any specific concerns you have.
                    </li>
                    <li>
                      <strong>Use a more capable model:</strong> Switch to GPT-4o for more detailed and accurate
                      analysis.
                    </li>
                    <li>
                      <strong>Optimize your prompt:</strong> Structure your prompt to focus on the specific aspects of
                      the code you want analyzed.
                    </li>
                    <li>
                      <strong>Break down large codebases:</strong> Analyze smaller, logically coherent pieces of code
                      separately.
                    </li>
                  </ol>
                </div>
              </div>

              <CodeBlock
                code={`// Improved prompt with better context
const analysis = await codePilot.analyzeCode({
  code,
  language,
  // Provide detailed context
  codeContext: {
    projectType: 'e-commerce web application',
    framework: 'next-js',
    purpose: 'This code handles user authentication and session management',
    specificConcerns: [
      'We are concerned about security vulnerabilities',
      'We want to optimize performance for high traffic',
      'We need to ensure proper error handling'
    ],
    relatedFiles: [
      { name: 'database.js', purpose: 'Handles database connections' },
      { name: 'models/user.js', purpose: 'User data model' }
    ]
  },
  // Use a more capable model
  model: 'gpt-4o',
  // Focus on specific analysis categories
  includePerformance: true,
  includeSecurity: true,
  includeBugs: true,
  // Request comprehensive detail
  detailLevel: 'comprehensive'
});`}
                language="javascript"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 id="api-key-issues">API Key Issues</h2>
        <p>
          API key problems are among the most common issues when working with CodePilot. Here's how to diagnose and
          resolve them:
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Common API Key Errors</h3>
            <CodeBlock code={apiKeyErrorCode} language="javascript" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Solutions</h3>
            <CodeBlock code={apiKeyFixCode} language="javascript" />
          </div>
        </div>

        <div className="bg-accent p-6 rounded-lg my-6">
          <h3 className="text-lg font-medium mb-4">API Key Troubleshooting Checklist</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <span>
                <strong>Verify the API key format:</strong> OpenAI API keys start with "sk-" followed by a string of
                characters.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <span>
                <strong>Check environment variables:</strong> Ensure your <code>.env.local</code> file is in the correct
                location and contains the API key.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <span>
                <strong>Verify API key permissions:</strong> Make sure your API key has the necessary permissions to
                access the models you're using.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <span>
                <strong>Check for billing issues:</strong> Ensure your OpenAI account has valid billing information and
                sufficient credits.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <span>
                <strong>Test the API key directly:</strong> Use a simple curl command or Postman to test if the API key
                works directly with the OpenAI API.
              </span>
            </li>
          </ul>
        </div>

        <div className="warning-box">
          <div className="flex gap-2">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-500" />
            <div>
              <h4 className="font-medium mb-1">Security Warning</h4>
              <p className="text-sm">
                Never hardcode your API key directly in your code or commit it to version control. Always use environment
                variables and ensure they're properly secured.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 id="rate-limiting">Rate Limiting Considerations</h2>
        <p>
          OpenAI imposes rate limits on API requests, which can affect your CodePilot usage. Here's how to handle rate
          limiting issues:
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Rate Limit Errors</h3>
            <CodeBlock code={rateLimitErrorCode} language="javascript" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Implementing Retries</h3>
            <CodeBlock code={rateLimitFixCode} language="javascript" />
          </div>
        </div>

        <h3 className="text-lg font-medium mt-8 mb-4">Rate Limit Best Practices</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Implement Throttling</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Limit the number of requests your application makes within a given time period. This helps prevent hitting
              rate limits in the first place.
            </p>
            <CodeBlock
              code={`// Simple request throttling
const queue = [];
let processing = false;

function enqueueRequest(code, language) {
  return new Promise((resolve, reject) => {
    queue.push({ code, language, resolve, reject });
    processQueue();
  });
}

async function processQueue() {
  if (processing || queue.length === 0) return;
  
  processing = true;
  const { code, language, resolve, reject } = queue.shift();
  
  try {
    const result = await codePilot.analyzeCode({ code, language });
    resolve(result);
  } catch (error) {
    reject(error);
  } finally {
    processing = false;
    // Wait 1 second before processing the next request
    setTimeout(processQueue, 1000);
  }
}`}
              language="javascript"
            />
          </div>

          <div className="border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Implement Caching</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Cache analysis results to avoid making redundant API calls for the same code. This reduces API usage and
              improves response times.
            </p>
            <CodeBlock
              code={`// Simple in-memory cache
const analysisCache = new Map();

async function getAnalysisWithCache(code, language) {
  // Create a cache key from the code and language
  const cacheKey = \`\${language}:\${hashCode(code)}\`;
  
  // Check if we have a cached result
  if (analysisCache.has(cacheKey)) {
    console.log('Cache hit! Returning cached analysis');
    return analysisCache.get(cacheKey);
  }
  
  // If not, perform the analysis
  console.log('Cache miss. Performing analysis...');
  const analysis = await codePilot.analyzeCode({
    code,
    language,
  });
  
  // Cache the result
  analysisCache.set(cacheKey, analysis);
  
  return analysis;
}

// Simple hash function for strings
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}`}
              language="javascript"
            />
          </div>
        </div>

        <div className="info-box mt-6">
          <h4 className="font-medium mb-2">OpenAI Rate Limits</h4>
          <p className="text-sm">
            OpenAI's rate limits vary by model and account type. As of the latest update, free tier accounts have lower
            limits than paid accounts. Check the{" "}
            <a href="https://platform.openai.com/docs/guides/rate-limits" target="_blank" rel="noreferrer">
              OpenAI documentation
            </a>{" "}
            for the most current information on rate limits.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="mt-10">Token Limit Issues</h2>
        <p>
          Large codebases can exceed the token limits of the AI models, resulting in incomplete analysis or errors.
          Here's how to handle token limit issues:
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Token Limit Errors</h3>
            <CodeBlock code={tokenLimitErrorCode} language="javascript" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Handling Large Codebases</h3>
            <CodeBlock code={tokenLimitFixCode} language="javascript" />
          </div>
        </div>

        <div className="tip-box">
          <h4 className="font-medium mb-2">Understanding Tokens</h4>
          <p className="text-sm">
            In the context of AI models, a "token" is roughly equivalent to 4 characters or 0.75 words. The GPT-4 model
            has a context window of about 8,192 tokens for input and output combined, while GPT-4o can handle up to
            128,000 tokens. When analyzing code, be mindful of these limits and consider splitting large codebases into
            smaller, logically coherent chunks.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="mt-10">Timeout Issues</h2>
        <p>
          API requests can sometimes time out, especially for complex code analysis. Here's how to handle timeout issues:
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Timeout Errors</h3>
            <CodeBlock code={timeoutErrorCode} language="javascript" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Handling Timeouts</h3>
            <CodeBlock code={timeoutFixCode} language="javascript" />
          </div>
        </div>

        <div className="info-box">
          <h4 className="font-medium mb-2">Client-Side Timeout Handling</h4>
          <p className="text-sm">
            For a better user experience, implement progressive loading on the client side to show partial results while
            the full analysis is being generated. This can be done using streaming responses or by breaking the analysis
            into smaller, incremental steps.
          </p>
          <CodeBlock
            code={`// Client-side progressive loading
'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export function ProgressiveCodeAnalyzer() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  async function handleAnalyzeCode() {
    if (!code.trim()) return;
    
    setLoading(true);
    setProgress(0);
    setAnalysis(null);
    
    // Start a progress indicator
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 1000);
    
    try {
      // Use streaming response
      const response = await fetch('/api/code-review-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      
      if (!response.ok) {
        throw new Error('Analysis failed');
      }
      
      if (!response.body) {
        throw new Error('ReadableStream not supported');
      }
      
      // Read the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }
        
        // Decode and append the chunk
        const chunk = decoder.decode(value, { stream: true });`}
              language="javascript"
            />
          </div>
        </motion.div>
    </div>
  );
}

