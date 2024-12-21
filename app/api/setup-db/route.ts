import { NextResponse } from "next/server";
import { setupDatabase } from "@/app/lib/supabaseSetup";

export async function GET() {
  try {
    await setupDatabase();
    return NextResponse.json({ message: "Database setup completed" });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Database setup failed" },
      { status: 500 },
    );
  }
}
