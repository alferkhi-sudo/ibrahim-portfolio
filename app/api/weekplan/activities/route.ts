import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { verifyWeekplanToken } from "@/lib/weekplan-auth";

async function checkAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("weekplan_auth")?.value;
  if (!token) return false;
  return verifyWeekplanToken(token);
}

function toActivity(row: Record<string, unknown>) {
  return {
    id:        row.id,
    day:       row.day,
    title:     row.title,
    startTime: row.start_time,
    endTime:   row.end_time,
    category:  row.category,
    isDefault: row.is_default,
  };
}

export async function GET(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = createAdminClient();
  const { data, error } = await db
    .from("weekplan_activities")
    .select("*")
    .order("day")
    .order("start_time");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data.map(toActivity));
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const db = createAdminClient();

  const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const { data, error } = await db
    .from("weekplan_activities")
    .insert({
      id,
      day:        body.day,
      title:      body.title,
      start_time: body.startTime,
      end_time:   body.endTime,
      category:   body.category,
      is_default: false,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(toActivity(data), { status: 201 });
}
