import { NextRequest, NextResponse } from 'next/server'
export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const queryText = body.query
  const userId = body.user || 'anonymous-user'

  if (!queryText || typeof queryText !== 'string') {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 })
  }

  const apiRes = await fetch('https://api.dify.ai/v1/chat-messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DIFY_APP_SECRET_KEY!}`
    },
    body: JSON.stringify({
      app_id: process.env.NEXT_PUBLIC_APP_ID,
      inputs: {
        'sys.query': queryText   // 🔴 ここが重要！
      },
      user: userId,
      response_mode: 'blocking'
    })
  })

  return new NextResponse(apiRes.body, { status: apiRes.status })
}
