import type { Lang } from "./ui";

export function resolveLang(currentLocale: string | undefined): Lang {
  return currentLocale === "en" ? "en" : "ja";
}
