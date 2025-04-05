import { getToken } from "@/lib/storeGetDelete";
import { NextResponse } from "next/server";

export async function GET() {
    const tokenPayload = await getToken();
    return NextResponse.json({ token: tokenPayload });
}
