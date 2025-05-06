import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        ok: true,
    });
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const data = {
        project : formData.get("project name"),
        description : formData.get("project description"),
    };

    return NextResponse.json({
        json: data,
    });
}
