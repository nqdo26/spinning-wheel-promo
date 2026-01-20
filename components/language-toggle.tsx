"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { locales, localeFlags } from "@/lib/locales";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    const currentIndex = locales.indexOf(locale);
    const nextIndex = (currentIndex + 1) % locales.length;
    setLocale(locales[nextIndex]);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4"
      title="Switch Language"
    >
      <Languages className="h-[1.2rem] w-[1.2rem]" />
      <span className="text-base">{localeFlags[locale]}</span>
      <span className="font-semibold uppercase">{locale}</span>
    </button>
  );
}
