import { NextResponse } from "next/server";

import Achievement from "@/models/achievement";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

// API Key only for GET endpoint
const API_KEY = process.env.API_KEY as string;

function validateApiKey(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  return apiKey === API_KEY;
}

export async function GET(request: Request) {
  // Check API key
  if (!validateApiKey(request)) {
    return new NextResponse(null, { status: 401 });
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
