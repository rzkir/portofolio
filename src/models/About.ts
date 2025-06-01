import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    card: {
      imageUrl: { type: String, required: true },
      name: { type: String, required: true },
      work: { type: String, required: true },
      location: { type: String, required: true },
      status: { type: String, required: true },
    },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const About =
  mongoose.models.About ||
  mongoose.model(process.env.NEXT_PUBLIC_ABOUT as string, aboutSchema);
