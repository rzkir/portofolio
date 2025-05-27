import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement =
  mongoose.models.Achievement ||
  mongoose.model("Achievement", achievementSchema);

export default Achievement;
