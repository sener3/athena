import { NextRequest, NextResponse } from "next/server"

import db from "@/lib/db"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const createdUser = await db.user.create({
            data: body,
        })

        return NextResponse.json(
            {
                user: createdUser,
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
