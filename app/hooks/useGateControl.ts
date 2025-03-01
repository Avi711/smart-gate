import { useState } from "react";
import { toast } from "sonner";
import { openGate } from "@/app/services/gate-service";
import { TOAST_STYLES } from "@/app/constants/toast-styles";
import { useTranslation } from "@/app/i18n/hooks/useTranslation";

export function useGateControl() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleOpenGate = async () => {
    setIsLoading(true);

    try {
      await openGate();
      toast.success(t("notifications.success.title"), {
        description: t("notifications.success.description"),
        ...TOAST_STYLES.success,
      });
    } catch (error) {
      console.error(error);
      toast.error(t("notifications.error.title"), {
        description: t("notifications.error.description"),
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
