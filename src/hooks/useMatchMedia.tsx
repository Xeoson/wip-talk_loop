import { useSyncExternalStore } from "react";

const createMatchMedia = () => {
  const callbacks = new Set<() => void>();
  const notify = () => {
    callbacks.forEach((c) => c());
  };

  const subscribe = (media: string) => (cb: () => void) => {
    const m = window.matchMedia(media);
    m.addEventListener("change", notify);
    return () => {
      m.removeEventListener("change", notify);
    };
  };

  const useMatchMedia = (media: string) =>
    useSyncExternalStore(
      subscribe(media),
      () => window.matchMedia(media).matches,
      () => false
    );

  return { useMatchMedia };
};

export const { useMatchMedia } = createMatchMedia();
