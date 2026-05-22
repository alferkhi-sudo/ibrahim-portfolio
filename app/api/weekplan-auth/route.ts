import { NextRequest, NextResponse } from "next/server";
import { createWeekplanToken } from "@/lib/weekplan-auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const expected = process.env.WEEKPLAN_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await createWeekplanToken(expected);

  const response = NextResponse.json({ ok: true });
  response.cookies.set("weekplan_auth", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("weekplan_auth", "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "lax",
    path: "/",
  });
  return response;
}
