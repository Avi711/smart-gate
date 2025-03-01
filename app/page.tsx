"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useGateControl } from "@/app/hooks/useGateControl";
import { useTranslation } from "@/app/components/client-translation-provider";
import Image from "next/image";

export default function Home() {
  const { isLoading, handleOpenGate } = useGateControl();
  const { t } = useTranslation();

  return (
    <div className="min-h-[100dvh] relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/90 dark:from-black/70 dark:to-black/90 z-10" />
      <Image
        src="https://d16zmyb4p6cn9i.cloudfront.net/general/gate-13.png"
        alt="Gate background"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="relative z-20 min-h-[100dvh] flex flex-col items-center justify-between p-4 sm:p-6">
        {/* Header */}
        <header className="w-full max-w-md mx-auto mt-20 sm:mt-24">
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center tracking-tight">
            {t("site.title")}
          </h1>
        </header>

        {/* Main Content */}
        <main className="w-full max-w-md mx-auto flex-1 flex flex-col items-center justify-center gap-8 py-8">
          <div className="w-full flex flex-col items-center space-y-8">
            {/* Gate Status and Description */}
            <div className="space-y-4 text-center px-4 backdrop-blur-sm bg-white/10 dark:bg-black/20 p-6 rounded-2xl">
              <p className="text-xl sm:text-2xl text-white/90 font-medium">
                {t("site.description")}
              </p>
              <p className="text-base text-white/70">{t("site.tapToOpen")}</p>
            </div>

            {/* Gate Control Button */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
              <Button
                className="relative w-full min-w-[280px] h-16 sm:h-[70px] text-lg sm:text-xl bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl border border-blue-400/50"
                onClick={handleOpenGate}
                disabled={isLoading}
              >
                <span className="flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <span>{t("actions.opening")}</span>
                      <Loader2 className="h-6 w-6 animate-spin ltr:order-last rtl:order-first" />
                    </>
                  ) : (
                    t("actions.openGate")
                  )}
                </span>
              </Button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full max-w-md mx-auto pb-6 sm:pb-10">
          <p className="text-sm text-center text-white/60">
            {t("footer.version")}
          </p>
        </footer>
      </div>
    </div>
  );
}
