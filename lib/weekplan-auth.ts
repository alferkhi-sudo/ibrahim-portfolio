const TOKEN_PAYLOAD = "weekplan_auth_v1";

export async function createWeekplanToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(TOKEN_PAYLOAD));
  return btoa(String.fromCharCode(...Array.from(new Uint8Array(sig))));
}

export async function verifyWeekplanToken(token: string): Promise<boolean> {
  const password = process.env.WEEKPLAN_PASSWORD;
  if (!password) return false;
  const expected = await createWeekplanToken(password);
  return token === expected;
}
