import { useEffect, useRef } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default <E extends HTMLElement>(callback: () => any) => {
  const elementRef = useRef<E | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!elementRef.current?.contains(e.target)) {
        callback();
      }
    };

    window.addEventListener("pointerdown", handleOutsideClick);
    return () => window.removeEventListener("pointerdown", handleOutsideClick);
  }, []);

  return elementRef;
};
