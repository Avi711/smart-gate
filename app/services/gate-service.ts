interface GateResponse {
  success: boolean;
  message: string;
}

export async function openGate(): Promise<GateResponse> {
  try {
    const response = await fetch("/api/open-gate", {
      method: "POST",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to open gate");
    }

    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
