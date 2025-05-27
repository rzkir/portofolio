import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
categorySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
