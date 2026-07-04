import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url } = await req.json();

  return NextResponse.json({
    result: `Received: ${url} — backend is working 🎉`,
  });
}
