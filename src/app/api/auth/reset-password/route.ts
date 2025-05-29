import { NextResponse } from "next/server";

import { Account } from "@/models/Account";

import { generateToken, generateJWT } from "@/utils/auth/token";

import { connectToDatabase } from "@/utils/mongodb/mongodb";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    await connectToDatabase();

    const account = await Account.findOne({ email });
    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    // Generate reset token
    const resetToken = generateToken();
    account.resetToken = resetToken;
    account.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await account.save();

    // In a real application, you would send this token via email
    // For development, we'll return it in the response
    return NextResponse.json({
      message: "Password reset token generated",
      resetToken, // Remove this in production
    });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    await connectToDatabase();

    const account = await Account.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Update password
    account.password = newPassword;
    account.resetToken = undefined;
    account.resetTokenExpiry = undefined;
    await account.save();

    // Generate new JWT token
    const jwtToken = await generateJWT({
      _id: account._id,
      email: account.email,
      role: account.role,
    });

    const response = NextResponse.json({
      message: "Password reset successful",
    });

    response.cookies.set({
      name: "token",
      value: jwtToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
