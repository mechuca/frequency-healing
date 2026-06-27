import { NextResponse } from "next/server";
import { warnMissingCommerceEnv } from "@/lib/commerce";

export async function POST() {
  const missing = warnMissingCommerceEnv("stripe-webhook");
  if (missing.length > 0) {
    return NextResponse.json({ error: "Webhook is not configured.", missing }, { status: 501 });
  }

  console.warn("StillTones commerce warning (stripe-webhook): order persistence and delivery email implementation is not present in this repository.");
  return NextResponse.json({ error: "Webhook implementation is not present." }, { status: 501 });
}
