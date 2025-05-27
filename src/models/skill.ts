import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
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

const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);

export default Skill;
