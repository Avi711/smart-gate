import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch("http://5.29.151.107:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "open" }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to open gate");
    }

    return NextResponse.json({
      success: true,
      message: "Gate opened successfully",
    });
  } catch (error) {
    console.error("Error opening gate:", error);
    return NextResponse.json(
      { success: false, message: "Failed to open gate" },
      { status: 500 }
    );
  }
}
