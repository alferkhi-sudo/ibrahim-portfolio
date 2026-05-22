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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const db = createAdminClient();

  const update: Record<string, unknown> = {};
  if (body.title !== undefined)     update.title      = body.title;
  if (body.day !== undefined)       update.day        = body.day;
  if (body.startTime !== undefined) update.start_time = body.startTime;
  if (body.endTime !== undefined)   update.end_time   = body.endTime;
  if (body.category !== undefined)  update.category   = body.category;

  const { data, error } = await db
    .from("weekplan_activities")
    .update(update)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(toActivity(data));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = createAdminClient();
  const { error } = await db
    .from("weekplan_activities")
    .delete()
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
