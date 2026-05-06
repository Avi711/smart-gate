import { NextResponse } from "next/server";

export async function POST() {
  try {
    const gateServerIp = process.env.GATE_SERVER_IP || "5.29.218.27";
    const gateServerPort = process.env.GATE_SERVER_PORT || "8000";
    const gateApiKey = process.env.GATE_API_KEY || "kakdila_kakdila";

    console.log(`Opening gate via ${gateServerIp}:${gateServerPort}`);

    const response = await fetch(
      `http://${gateServerIp}:${gateServerPort}/open-gate?key=${gateApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "open" }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to open gate");
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
