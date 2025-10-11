import { NextRequest, NextResponse } from "next/server";

import axios from "axios";

import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );

      return NextResponse.json(
        {
          error: "Validation failed",
          details: errorMessages,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    const requestData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
    if (apiSecret) {
      headers["Authorization"] = `Bearer ${apiSecret}`;
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/contact`,
      requestData,
      {
        headers,
        timeout: 10000,
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return NextResponse.json(
          { error: error.response.data?.error || "Server error" },
          { status: error.response.status }
        );
      } else if (error.request) {
        return NextResponse.json(
          { error: "Network error - unable to reach server" },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
