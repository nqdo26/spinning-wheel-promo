"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { SpinningWheel, type Prize } from "@/components/spinning-wheel";
import { ResultModal } from "@/components/result-modal";
import { useLanguage } from "@/lib/language-context";

export default function Home() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [hasSpun, setHasSpun] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const prizes: Prize[] = [
    {
      id: "discount-10",
      label: t.prizes.discount10,
      color: "#EF4444", // Red
      textColor: "#FFFFFF",
    },
    {
      id: "free-shipping",
      label: t.prizes.freeShipping,
      color: "#F59E0B", // Amber
      textColor: "#FFFFFF",
    },
    {
      id: "discount-20",
      label: t.prizes.discount20,
      color: "#10B981", // Emerald
      textColor: "#FFFFFF",
    },
    {
      id: "gift-50",
      label: t.prizes.giftCard50,
      color: "#3B82F6", // Blue
      textColor: "#FFFFFF",
    },
    {
      id: "discount-30",
      label: t.prizes.discount30,
      color: "#8B5CF6", // Violet
      textColor: "#FFFFFF",
    },
    {
      id: "mystery",
      label: t.prizes.mystery,
      color: "#EC4899", // Pink
      textColor: "#FFFFFF",
    },
    {
      id: "no-luck",
      label: t.prizes.noLuck,
      color: "#6B7280", // Gray
      textColor: "#FFFFFF",
    },
    {
      id: "gift-100",
      label: t.prizes.giftCard100,
      color: "#14B8A6", // Teal
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
      // Reset for another spin
      setHasSpun(false);
      setWonPrize(null);
    }
  };

  // Simple email validation
  const isEmailValid =
    email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 right-0 p-4 flex gap-2 z-20">
        <LanguageToggle />
        <ThemeToggle />
      </header>

      <main className="flex min-h-screen items-center justify-center p-8 pt-20">
        <div className="max-w-4xl w-full space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">{t.hero.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Email Input */}
          {!hasSpun && (
            <div className="max-w-md mx-auto space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => setEmail(e.target.value.trim())}
                placeholder={t.hero.emailPlaceholder}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                autoFocus
                autoComplete="email"
                aria-label="Email address"
                aria-invalid={email.length > 0 && !isEmailValid}
                aria-describedby={
                  email && !isEmailValid ? "email-error" : undefined
                }
              />
              {email && !isEmailValid && (
                <p
                  id="email-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {t.wheel.invalidEmail}
                </p>
              )}
            </div>
          )}

          {/* Spinning Wheel */}
          <div className="flex justify-center">
            <SpinningWheel
              prizes={prizes}
              onSpinComplete={handleSpinComplete}
              disabled={!isEmailValid}
            />
          </div>

          {/* Result Modal */}
          <ResultModal
            open={showResultModal}
            onOpenChange={handleModalClose}
            prize={wonPrize}
            email={email}
          />

          {/* Terms */}
          <p className="text-sm text-muted-foreground text-center">
            {t.hero.termsText}{" "}
            <a href="#" className="underline hover:text-foreground">
              {t.hero.termsLink}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
