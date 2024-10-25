export const locales = {
  en: () => import("./en").then((module) => module.default),
  pl: () => import("./pl").then((module) => module.default),
};
