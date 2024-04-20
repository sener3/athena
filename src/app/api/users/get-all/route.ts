import { NextRequest, NextResponse } from "next/server"

import db from "@/lib/db"

export async function GET(request: NextRequest) {
    try {
        const users = await db.user.findMany({})

        return NextResponse.json(
            {
                users: users,
            },
            { status: 200 }
        )
    } catch (err) {
        return NextResponse.json(
            {
                error: err,
            },
            { status: 500 }
        )
    }
}
