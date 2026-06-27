import { NextResponse } from "next/server";
import { warnMissingCommerceEnv } from "@/lib/commerce";

export async function POST() {
  const missing = warnMissingCommerceEnv("create-checkout");
  if (missing.length > 0) {
    return NextResponse.json({ error: "Checkout is not configured.", missing }, { status: 501 });
  }

  console.warn("StillTones commerce warning (create-checkout): Stripe Checkout implementation is not present in this repository.");
  return NextResponse.json({ error: "Checkout implementation is not present." }, { status: 501 });
}
