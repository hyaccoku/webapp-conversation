import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const {query, user, inputs = {}, response_mode = 'blocking'} = await req.json();

  if (!query || typeof query !== 'string') {
    return NextResponse.json({error:'query missing'}, {status:400});
  }

  const res = await fetch('https://api.dify.ai/v1/chat-messages', {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DIFY_APP_SECRET_KEY!}`
    },
    body: JSON.stringify({
      app_id : process.env.NEXT_PUBLIC_APP_ID,
      query,
      inputs,
      user: user || 'anonymous',
      response_mode
    })
  });

  return new NextResponse(res.body, {status: res.status});
}
