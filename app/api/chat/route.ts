import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    const promptWithInstruction = `Please provide a brief and concise response (2-3 sentences max): ${message}`;
    
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.7,
      }
    });

    const result = await model.generateContent(promptWithInstruction);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 