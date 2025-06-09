import { NextRequest, NextResponse } from 'next/server'

// export const runtime = 'edge'
console.log('✅ ENV CHECK:', process.env.DIFY_APP_SECRET_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      query,
      inputs = {},
      user = 'anonymous-user',
      response_mode = 'blocking'
    } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { code: 'invalid_param', message: 'Query is required.' },
        { status: 400 }
      )
    }

    const payload = {
      app_id: process.env.NEXT_PUBLIC_APP_ID,
      query,
      inputs,
      user,
      response_mode
    }

    const apiRes = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DIFY_APP_SECRET_KEY!}`
      },
      body: JSON.stringify(payload)
    })

    // 🔧 streamを直接返すのではなく、.json()で変換
    const result = await apiRes.json()
    return NextResponse.json(result, { status: apiRes.status })

  } catch (error) {
    console.error('API Route Error:', error)
    return NextResponse.json(
      { code: 'internal_error', message: 'Unexpected server error.' },
      { status: 500 }
    )
  }
}
