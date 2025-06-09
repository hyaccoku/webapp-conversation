import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { query, inputs = {}, user, response_mode = 'blocking' } = body

  if (!query || typeof query !== 'string') {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 })
  }

  const apiRes = await fetch('https://api.dify.ai/v1/chat-messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DIFY_APP_SECRET_KEY!}`
    },
    body: JSON.stringify({
      app_id: process.env.NEXT_PUBLIC_APP_ID,
      query,               // ✅ ここに直接 query を渡す
      inputs,
      user: user || 'anonymous-user',
      response_mode
    })
  })

  return new NextResponse(apiRes.body, { status: apiRes.status })
}
