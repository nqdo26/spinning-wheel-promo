import { en } from "./en";
import { vi } from "./vi";

export const translations = {
  en,
  vi,
} as const;

export type Locale = keyof typeof translations;

export const locales: Locale[] = ["en", "vi"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  vi: "🇻🇳",
};
