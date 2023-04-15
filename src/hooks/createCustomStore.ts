import { useSyncExternalStore } from "react";

export const createCustomStore = <S extends Record<string, any>>(
  initState?: S
) => {
  let store: Partial<S> = initState ?? {};

  const get = () => store;

  const setOne = <F extends keyof S>(
    field: F,
    val: ((value: S[F]) => S[F]) | S[F]
  ) => {
    if (val instanceof Function) {
      store[field] = val(store[field]!);
    } else {
      store[field] = val;
    }
    listeners.forEach((cb) => cb());
  };

  const set = (fields: { [Key in keyof S]?: S[Key] }) => {
    store = Object.assign(store, fields);
    listeners.forEach((cb) => cb());
  };

  const listeners = new Set<() => void>();
  const subscribe = (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };

  const useValue = <R>(selector: (store: Partial<S>) => R): R => {
    return useSyncExternalStore(subscribe, () => selector(store));
  };

  return { useValue, setOne, set, get };
};
