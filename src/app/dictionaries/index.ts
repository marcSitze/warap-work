import "server-only";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  fr: () => import("./fr.json").then((module) => module.default),
};

export type LocaleType = "en" | "fr"
export const getDictionary = async (locale: LocaleType) =>
  dictionaries[locale]();
