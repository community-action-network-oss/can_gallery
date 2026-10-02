export const LOCALES = ["en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const DIRECTION: Record<Locale, "ltr" | "rtl"> = { en: "ltr" };
export const htmlAttrs = (locale: Locale = DEFAULT_LOCALE) => ({ lang: locale, dir: DIRECTION[locale] });
