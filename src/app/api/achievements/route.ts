import { NextResponse } from "next/server";

import Achievement from "@/models/achievement";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

// Check if request is from frontend fetch
function isFrontendRequest(request: Request) {
  const referer = request.headers.get("referer");
  return referer?.includes(process.env.NEXT_PUBLIC_BASE_URL || "");
}

export async function GET(request: Request) {
  // In production, only allow requests from frontend
  if (process.env.NODE_ENV === "production" && !isFrontendRequest(request)) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    await connectToDatabase();
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    console.log("Received data in POST:", body);

    const achievement = new Achievement(body);
    await achievement.save();

    console.log("Created achievement:", achievement);
    return NextResponse.json(achievement);
  } catch (error) {
    console.error("Create achievement error:", error);
    return NextResponse.json(
      { error: "Failed to create achievement" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    console.log("Received data in PUT:", body);

    const achievement = await Achievement.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log("Updated achievement:", achievement);

    if (!achievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(achievement);
  } catch (error) {
    console.error("Update achievement error:", error);
    return NextResponse.json(
      { error: "Failed to update achievement" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const achievement = await Achievement.findByIdAndDelete(id);
    if (!achievement) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Achievement deleted successfully" });
  } catch (error) {
    console.error("Delete achievement error:", error);
    return NextResponse.json(
      { error: "Failed to delete achievement" },
      { status: 500 }
    );
  }
}
