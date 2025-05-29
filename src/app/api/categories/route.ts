import { NextResponse } from "next/server";

import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "@/services/categoryService";

// GET all categories
export async function GET() {
  try {
    const categories = await getAllCategories();

    if (!Array.isArray(categories)) {
      console.error("Categories is not an array:", categories);
      return NextResponse.json([], { status: 500 });
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error in GET /api/categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST create new category
export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const category = await createCategory({ name });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

// PUT update category
export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json();

    if (!id || !name) {
      return NextResponse.json(
        { error: "ID and name are required" },
        { status: 400 }
      );
    }

    const category = await updateCategory(id, { name });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await deleteCategory(id);
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
