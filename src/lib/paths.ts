import { DEFAULT_LOCALE, type Locale } from "./locale";

/** Internal path for a locale: unprefixed for the default locale, `/{locale}{path}` otherwise. */
export const localePath = (path: string, locale: Locale = DEFAULT_LOCALE): string =>
  locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
