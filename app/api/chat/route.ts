// app/api/chat/route.ts
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    query = '',
    inputs = {},
    user = 'anonymous-user',
    conversation_id = '',
    response_mode = 'blocking', // 明示的に
    files = [],
    auto_generate_name = true
  } = body;

  const apiRes = await fetch('https://api.dify.ai/v1/chat-messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DIFY_APP_SECRET_KEY!}`
    },
    body: JSON.stringify({
      app_id: process.env.NEXT_PUBLIC_APP_ID,
      query,
      inputs,
      user,
      conversation_id,
      response_mode,
      files,
      auto_generate_name
    })
  });

  return new NextResponse(apiRes.body, { status: apiRes.status });
}
