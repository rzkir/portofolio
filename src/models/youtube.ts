import mongoose from "mongoose";

const frameworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const youtubeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      ref: "Category",
    },
    thumbnail: {
      type: String,
      required: true,
    },
    frameworks: {
      type: [frameworkSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Add pre-save middleware to log the document
youtubeSchema.pre("save", function (next) {
  next();
});

const Youtube =
  mongoose.models.Youtube || mongoose.model("Youtube", youtubeSchema);

export default Youtube;
