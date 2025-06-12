import { NextResponse } from "next/server";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

import Skill from "@/models/skill";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const skills = await Skill.find().sort({ createdAt: -1 });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    console.log("Received data in POST:", body);

    const skill = new Skill(body);
    await skill.save();

    console.log("Created skill:", skill);
    return NextResponse.json(skill);
  } catch (error) {
    console.error("Create skill error:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
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

    const skill = await Skill.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log("Updated skill:", skill);

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(skill);
  } catch (error) {
    console.error("Update skill error:", error);
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Delete skill error:", error);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
