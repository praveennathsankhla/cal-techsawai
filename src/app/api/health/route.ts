import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    { ok: true, service: "techsawai" },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
