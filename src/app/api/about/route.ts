import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb/mongodb";
import { About } from "@/models/About";

// GET all about data
export async function GET() {
  try {
    await connectDB();
    const aboutData = await About.find();
    return NextResponse.json(aboutData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// POST new about data
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const aboutData = await About.create(body);
    return NextResponse.json(aboutData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create data" },
      { status: 500 }
    );
  }
}

// PUT update about data
export async function PUT(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updatedData = await About.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedData) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    return NextResponse.json(updatedData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}

// DELETE about data
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedData = await About.findByIdAndDelete(id);

    if (!deletedData) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Data deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete data" },
      { status: 500 }
    );
  }
}
