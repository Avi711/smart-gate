"use client";

import { useState } from "react";
import { useTranslation } from "@/app/components/client-translation-provider";
import { openGate } from "@/app/services/gate-service";
import { toast } from "sonner";
import { TOAST_STYLES } from "@/app/constants/toast-styles";

export default function CompatiblePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleOpenGate = async () => {
    setIsLoading(true);

    try {
      await openGate();
      toast.success(t("notifications.success.title"), {
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

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Simple Header */}
        <header className="text-center mb-12 pt-8">
          <h1 className="text-3xl font-bold">{t("site.title")}</h1>
        </header>

        {/* Simple Content */}
        <main className="flex flex-col items-center justify-center">
          <div className="text-center mb-10 bg-slate-800 p-6 rounded-lg max-w-sm mx-auto">
            <p className="text-xl mb-4">{t("site.description")}</p>
            <p className="text-sm text-gray-300">{t("site.tapToOpen")}</p>
          </div>

          {/* Simple Button with loading spinner */}
          <button
            onClick={handleOpenGate}
            disabled={isLoading}
            className="bg-blue-600 text-white py-4 px-8 rounded-lg text-xl font-medium w-full max-w-xs flex items-center justify-center min-h-[60px]"
          >
            {isLoading ? (
              <div className="h-6 w-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              t("actions.openGate")
            )}
          </button>
        </main>

        {/* Simple Footer */}
        <footer className="text-center mt-16 text-sm text-gray-400">
          <p>{t("footer.version")}</p>
        </footer>
      </div>
    </div>
  );
}
