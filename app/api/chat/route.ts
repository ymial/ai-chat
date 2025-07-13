import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: 'llama3-8b-8192',
      messages,
    });

    return NextResponse.json({
      reply: {
        role: 'assistant',
        content: response.choices[0].message.content,
      },
    });
  } catch (error) {
    console.error('Groq API error:', error);
    return NextResponse.json({ error: 'Groq API error' }, { status: 500 });
  }
}