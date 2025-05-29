import mongoose from "mongoose";

const frameworkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
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
frameworkSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Framework =
  mongoose.models.Framework || mongoose.model("Framework", frameworkSchema);
