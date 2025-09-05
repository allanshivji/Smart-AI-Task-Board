import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface AIAnalysis {
  category: string;
  priority: 'low' | 'medium' | 'high';
  estimatedHours: number;
  reasoning: string;
  tags: string[];
}

// Helper function to clean and parse AI response
const parseAIResponse = (text: string): any => {
  try {
    // Remove markdown code blocks and extra whitespace
    let cleanText = text.trim();
    
    // Remove ```json and ``` markers
    cleanText = cleanText.replace(/```json\s*/g, '');
    cleanText = cleanText.replace(/```\s*/g, '');
    
    // Remove any leading/trailing whitespace
    cleanText = cleanText.trim();
    
    // Parse the cleaned JSON
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Failed to parse AI response:', text);
    throw new Error('Invalid AI response format');
  }
};

export const analyzeTask = async (title: string, description: string): Promise<AIAnalysis> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    Analyze this software development task and respond with ONLY valid JSON (no markdown, no code blocks, no extra text):
    
    Title: "${title}"
    Description: "${description}"
    
    Return exactly this JSON structure:
    {
      "category": "frontend",
      "priority": "medium",
      "estimatedHours": 5,
      "reasoning": "brief explanation",
      "tags": ["tag1", "tag2"]
    }
    
    Rules:
    - category: must be one of: frontend, backend, database, devops, design, testing, documentation
    - priority: must be one of: low, medium, high
    - estimatedHours: number between 1-40
    - reasoning: brief explanation (1-2 sentences)
    - tags: 2-4 relevant technical keywords
    
    IMPORTANT: Return ONLY the JSON object, no other text, no markdown formatting.
    `;

    console.log('🤖 Sending request to Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('🤖 Raw AI response:', text);
    
    // Parse the response with our robust parser
    const analysis = parseAIResponse(text);
    
    // Validate the response has required fields
    if (!analysis.category || !analysis.priority || !analysis.estimatedHours) {
      throw new Error('Missing required fields in AI response');
    }
    
    console.log('✅ Parsed AI analysis:', analysis);
    return analysis;
  } catch (error) {
    console.error('AI analysis failed:', error);
    
    // Fallback analysis if AI fails
    return {
      category: 'backend',
      priority: 'medium',
      estimatedHours: 4,
      reasoning: 'AI analysis unavailable, using default values',
      tags: ['task']
    };
  }
};

export const generateInsights = async (tasks: any[]): Promise<string[]> => {
  try {
    if (tasks.length === 0) {
      return ['No tasks yet! Create your first task to get AI insights.'];
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const taskSummary = tasks.map(task => 
      `${task.title} (${task.priority} priority, ${task.status})`
    ).join('\n');
    
    const prompt = `
    Analyze these software project tasks and provide insights as a JSON array of strings.
    
    Tasks:
    ${taskSummary}
    
    Return ONLY a JSON array like this (no markdown, no code blocks):
    ["insight about workload", "insight about priorities", "recommendation for team"]
    
    Focus on:
    - Overall workload and priorities
    - Task distribution and balance  
    - Potential bottlenecks or risks
    - Specific recommendations
    
    IMPORTANT: Return ONLY the JSON array, no other text.
    `;

    console.log('🤖 Generating insights...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('🤖 Raw insights response:', text);
    
    const insights = parseAIResponse(text);
    return Array.isArray(insights) ? insights : ['AI insights temporarily unavailable'];
  } catch (error) {
    console.error('AI insights generation failed:', error);
    return [
      `You have ${tasks.length} tasks total`,
      `${tasks.filter(t => t.priority === 'high').length} high priority tasks need attention`,
      'Create more tasks to get better AI insights!'
    ];
  }
};