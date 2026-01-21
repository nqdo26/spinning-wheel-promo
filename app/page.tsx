"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { SpinningWheel, type Prize } from "@/components/spinning-wheel";
import { ResultModal } from "@/components/result-modal";
import { useLanguage } from "@/lib/language-context";

export default function Home() {
  const { t } = useLanguage();
  const [hasSpun, setHasSpun] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showWheel, setShowWheel] = useState(false);

  const prizes: Prize[] = [
    {
      id: "discount-10",
      label: t.prizes.discount10,
      color: "#EF4444",
      textColor: "#FFFFFF",
    },
    {
      id: "free-shipping",
      label: t.prizes.freeShipping,
      color: "#F59E0B",
      textColor: "#FFFFFF",
    },
    {
      id: "discount-20",
      label: t.prizes.discount20,
      color: "#10B981",
      textColor: "#FFFFFF",
    },
    {
      id: "gift-50",
      label: t.prizes.giftCard50,
      color: "#3B82F6",
      textColor: "#FFFFFF",
    },
    {
      id: "discount-30",
      label: t.prizes.discount30,
      color: "#8B5CF6",
      textColor: "#FFFFFF",
    },
    {
      id: "mystery",
      label: t.prizes.mystery,
      color: "#EC4899",
      textColor: "#FFFFFF",
    },
    {
      id: "no-luck",
      label: t.prizes.noLuck,
      color: "#6B7280",
      textColor: "#FFFFFF",
    },
    {
      id: "gift-100",
      label: t.prizes.giftCard100,
      color: "#14B8A6",
      textColor: "#FFFFFF",
    },
  ];

  const handleSpinComplete = (prize: Prize) => {
    setWonPrize(prize);
    setHasSpun(true);
    setShowResultModal(true);
  };

  const handleModalClose = (open: boolean) => {
    setShowResultModal(open);
    if (!open) {
      setHasSpun(false);
      setWonPrize(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 right-0 p-4 flex gap-2 z-20">
        <LanguageToggle />
        <ThemeToggle />
      </header>

      <main className="flex min-h-screen items-center justify-center p-8 pt-20">
        <div className="max-w-4xl w-full space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-20">
              {t.hero.title}
            </h1>
          </div>

          {!showWheel && !hasSpun && (
            <div className="max-w-md mx-auto">
              <button
                onClick={() => setShowWheel(true)}
                className="w-full px-8 py-4 bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-lg font-bold text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
              >
                {t.hero.showWheel || "Show Spinning Wheel"}
              </button>
            </div>
          )}

          {showWheel && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <SpinningWheel
                  prizes={prizes}
                  onSpinComplete={handleSpinComplete}
                  disabled={false}
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setShowWheel(false)}
                  className="px-6 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg font-medium transition-all"
                >
                  {t.hero.backToHome || "Back to Home"}
                </button>
              </div>
            </div>
          )}

          <ResultModal
            open={showResultModal}
            onOpenChange={handleModalClose}
            prize={wonPrize}
          />
        </div>
      </main>
    </div>
  );
}
