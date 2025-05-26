import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb/mongodb";
import { Account } from "@/models/Account";

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, role } = await request.json();

    await connectDB();

    // Check if account already exists
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create new account
    const account = new Account({
      email,
      password,
      firstName,
      lastName,
      role: role || "user",
    });

    await account.save();

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          _id: account._id,
          email: account.email,
          firstName: account.firstName,
          lastName: account.lastName,
          role: account.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Sign up error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
