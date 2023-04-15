import { useSyncExternalStore } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
// import tailConfig from "../../tailwind.config"

const toNum = (str: string) => {
  return Number(str.replace(/\D/g, ""));
};

const createThemeScreens = <T extends Record<string, string>>(
  themeScreens: T
) => {
  const screens = Object.entries(themeScreens).sort(
    ([ke1, val1], [key2, val2]) => (toNum(val1) < toNum(val2) ? 1 : -1)
  );

  let currentScreen;

  const get = () => {
    const screen = screens.find(
      ([key, val]) => window.matchMedia(`(min-width: ${val})`).matches
    );
    if (!screen) return "default";

    currentScreen = screen[0];
    return currentScreen;
  };

  const getMatch = (screenMedia: string) => {
    return window.matchMedia(`(min-width: ${themeScreens[screenMedia]})`)
      .matches;
  };

  const subscribe = (callback: () => void) => {
    window.addEventListener("resize", callback);
    return () => window.addEventListener("resize", callback);
  };

  const subscribeMatch = (screenMedia: string) => (callback: () => void) => {
    const s = window.matchMedia(`(min-width: ${themeScreens[screenMedia]})`);
    s.addEventListener("change", callback);
    return () => {
      s.removeEventListener("change", callback);
    };
  };

  const useScreen = (): string => {
    return useSyncExternalStore(subscribe, () => get());
  };

  const useMatchScreen = (screenMedia: string) => {
    return useSyncExternalStore(
      subscribeMatch(screenMedia),
      () => getMatch(screenMedia),
      () => false
    );
  };

  return { useMatchScreen, useScreen };
};

const { theme } = resolveConfig(require("../../tailwind.config"));
export const { useScreen, useMatchScreen } = createThemeScreens(
  theme?.screens as any
);
