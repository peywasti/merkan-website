import { common } from "./common";
import { home } from "./home";
import { about } from "./about";
import { services } from "./services";
import { why } from "./why";
import { steps } from "./steps";
import { contact } from "./contact";

export const translations = {
  en: { ...common.en, home: home.en, about: about.en, services: services.en, why: why.en, steps: steps.en, contact: contact.en },
  fa: { ...common.fa, home: home.fa, about: about.fa, services: services.fa, why: why.fa, steps: steps.fa, contact: contact.fa },
  tr: { ...common.tr, home: home.tr, about: about.tr, services: services.tr, why: why.tr, steps: steps.tr, contact: contact.tr },
};

export type Lang = "en" | "fa" | "tr";
export const defaultLang: Lang = "en";
export const langs: Lang[] = ["en", "fa", "tr"];

export function isLang(value: string): value is Lang {
  return langs.includes(value as Lang);
}
