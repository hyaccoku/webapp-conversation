// app/api/chat/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge';           // Edge Function で高速＆環境変数安全

export async function POST(req: NextRequest) {
  const body = await req.json();

  const apiRes = await fetch('https://api.dify.ai/v1/chat-messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DIFY_APP_SECRET_KEY!}`  // ← Secret Key はサーバ側だけ
    },
    body: JSON.stringify({
      app_id: process.env.NEXT_PUBLIC_APP_ID,   // ここは公開しても問題ない ID
      user: body.user || 'anonymous-user',
      ...body
    })
  });

  return new NextResponse(apiRes.body, { status: apiRes.status });
}
