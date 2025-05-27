import { Category } from "@/models/Category";
import { connectDB } from "@/utils/mongodb/mongodb";

// Create a new category
export async function createCategory(data: { name: string }) {
  try {
    await connectDB();
    const category = await Category.create(data);
    return category;
  } catch (error) {
    throw error;
  }
}

// Get all categories
export async function getAllCategories() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ createdAt: -1 });
    return categories;
  } catch (error) {
    throw error;
  }
}

// Get a single category by ID
export async function getCategoryById(id: string) {
  try {
    await connectDB();
    const category = await Category.findById(id);
    return category;
  } catch (error) {
    throw error;
  }
}

// Update a category
export async function updateCategory(id: string, data: { name: string }) {
  try {
    await connectDB();
    const category = await Category.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );
    return category;
  } catch (error) {
    throw error;
  }
}

// Delete a category
export async function deleteCategory(id: string) {
  try {
    await connectDB();
    const category = await Category.findByIdAndDelete(id);
    return category;
  } catch (error) {
    throw error;
  }
}
