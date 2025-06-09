// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'  // Edge Functionで高速化（必須）

export async function POST(req: NextRequest) {
  const body = await req.json()

  const apiRes = await fetch('https://api.dify.ai/v1/chat-messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DIFY_APP_SECRET_KEY!}`
    },
    body: JSON.stringify({
      app_id: process.env.NEXT_PUBLIC_APP_ID,
      query: body.query || '',
      inputs: body.inputs || {},
      user: body.user || 'anonymous-user',
      response_mode: body.response_mode || 'blocking',
      conversation_id: body.conversation_id || undefined,
      files: body.files || undefined,
      auto_generate_name: body.auto_generate_name ?? true
    })
  })

  return new NextResponse(apiRes.body, {
    status: apiRes.status
  })
}
