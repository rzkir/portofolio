import { NextRequest, NextResponse } from "next/server";

import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json(
        { error: "Path parameter is required" },
        { status: 400 }
      );
    }

    // Revalidate the specific path
    revalidatePath(path);

    return NextResponse.json({
      message: `Path ${path} revalidated successfully`,
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Error revalidating path:", error);
    return NextResponse.json(
      { error: "Failed to revalidate path" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json(
        { error: "Path parameter is required" },
        { status: 400 }
      );
    }

    // Revalidate the specific path
    revalidatePath(path);

    return NextResponse.json({
      message: `Path ${path} revalidated successfully`,
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Error revalidating path:", error);
    return NextResponse.json(
      { error: "Failed to revalidate path" },
      { status: 500 }
    );
  }
}
