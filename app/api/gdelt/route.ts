import { NextResponse } from "next/server";

export async function GET(){
    try {
        
    } catch (err: unknown) {
        return NextResponse.json({ error: "" },  { status: 500 });
    }
}