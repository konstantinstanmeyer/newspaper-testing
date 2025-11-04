import { NextResponse } from "next/server";

export async function GET(){
    try {
        
    } catch (err: unknown) {
        return NextResponse.json({ error: (err as Error).message },  { status: 500 });
    }
}