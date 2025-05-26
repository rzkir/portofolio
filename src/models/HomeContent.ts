import mongoose from "mongoose";

const homeContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    span: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const HomeContent =
  mongoose.models.HomeContent ||
  mongoose.model("HomeContent", homeContentSchema);
