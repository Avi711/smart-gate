import { useState } from "react";
import { toast } from "sonner";
import { openGate } from "@/app/services/gate-service";
import { TOAST_STYLES } from "@/app/constants/toast-styles";

export function useGateControl() {
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenGate = async () => {
    setIsLoading(true);

    try {
      await openGate();
      toast.success("Gate opened successfully", {
        description: "The gate is now opening...",
        ...TOAST_STYLES.success,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to open gate", {
        ...TOAST_STYLES.error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleOpenGate,
  };
}
