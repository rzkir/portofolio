import { NextResponse } from "next/server";
import imagekitInstance from "@/utils/imgkit/imagekit";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString("base64");

    const uploadResponse = await imagekitInstance.upload({
      file: `data:${file.type};base64,${base64String}`,
      fileName: file.name,
      folder: "/achievements",
    });

    return NextResponse.json({ url: uploadResponse.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
