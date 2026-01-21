"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import type { Prize } from "./spinning-wheel";

type ResultModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prize: Prize | null;
};

export function ResultModal({ open, onOpenChange, prize }: ResultModalProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  const isNoLuck = prize?.id === "no-luck";

  const promoCode = React.useMemo(() => {
    if (!prize || isNoLuck) return null;
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SPIN${random}`;
  }, [prize?.id, isNoLuck, prize]);

  const handleCopyCode = async () => {
    if (!promoCode) return;

    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setCopied(false);
  };

  if (!prize) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {isNoLuck ? t.result.noLuckTitle : t.result.title}
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            {isNoLuck ? t.result.noLuckMessage : t.result.message}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: prize.color }}
            >
              <span
                className="text-2xl font-bold text-center px-2"
                style={{ color: prize.textColor || "white" }}
              >
                {isNoLuck ? "😔" : "🎉"}
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {t.wheel.youWon}
              </p>
              <p className="text-2xl font-bold" style={{ color: prize.color }}>
                {prize.label}
              </p>
            </div>
          </div>

          {!isNoLuck && promoCode && (
            <div className="space-y-3">
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-2 text-center">
                  {t.result.code}
                </p>
                <p className="text-xl font-mono font-bold text-center tracking-wider">
                  {promoCode}
                </p>
              </div>

              <Button
                onClick={handleCopyCode}
                variant="outline"
                className="w-full"
                disabled={copied}
              >
                {copied ? t.result.copied : t.result.copyCode}
              </Button>
            </div>
          )}

          <div className="space-y-2">
            <Button onClick={handleClose} className="w-full" size="lg">
              {isNoLuck ? t.wheel.tryAgain : t.result.shopNow}
            </Button>
            {!isNoLuck && (
              <Button
                onClick={handleClose}
                variant="ghost"
                className="w-full"
                size="sm"
              >
                {t.common.close}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
