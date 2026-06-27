import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = (await request.json().catch(() => ({}))) as { email?: string };
  if (!email || !email.includes("@")) return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.warn("StillTones subscribe warning: missing RESEND_API_KEY or RESEND_AUDIENCE_ID.");
    return NextResponse.json({ error: "Email list is not configured yet." }, { status: 503 });
  }

  const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    console.warn("StillTones subscribe warning: Resend contact create failed.", await response.text());
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
