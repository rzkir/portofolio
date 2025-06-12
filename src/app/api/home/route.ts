import { NextResponse } from "next/server";

import { HomeContent } from "@/models/HomeContent";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

// GET all home contents
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const contents = await HomeContent.find().sort({ createdAt: -1 });
    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contents" },
      { status: 500 }
    );
  }
}

// POST new home content
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const content = await HomeContent.create(body);
    return NextResponse.json(content, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create content" },
      { status: 500 }
    );
  }
}

// PUT update home content
export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { id, ...updateData } = body;

    const content = await HomeContent.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}

// DELETE home content
export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const content = await HomeContent.findByIdAndDelete(id);

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete content" },
      { status: 500 }
    );
  }
}
