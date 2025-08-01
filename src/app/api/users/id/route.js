import { NextResponse } from "next/server";
import pool from "@/libs/mysql";

export async function GET(request, { params }) {
  const slug = params.slug; // user id

  try {
    const db = await pool.getConnection();

    const query = "select * from account where id = ?";
    const [rows] = await db.execute(query, [slug]);
    db.release();

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
