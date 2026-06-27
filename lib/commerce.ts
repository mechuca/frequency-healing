const requiredCommerceEnv = ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "RESEND_API_KEY"] as const;

export function missingCommerceEnv() {
  return requiredCommerceEnv.filter((key) => !process.env[key]);
}

export function warnMissingCommerceEnv(context: string) {
  const missing = missingCommerceEnv();
  if (missing.length > 0) console.warn(`StillTones commerce warning (${context}): missing ${missing.join(", ")}.`);
  return missing;
}
