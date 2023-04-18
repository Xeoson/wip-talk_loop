import { useSyncExternalStore } from "react";

export async function findAsyncSequential<T>(
  array: T[],
  predicate: (t: T) => Promise<boolean>
): Promise<T | undefined> {
  for (const t of array) {
    if (await predicate(t)) {
      return t;
    }
  }
  return undefined;
}

export interface IValidateRule {
  isValid: (value: any) => boolean | Promise<boolean>;
  errorMessage: string;
}

export type IRules<F> = Record<keyof F, IValidateRule[]>;

export const defaultValidateRules = {
  required: () => ({
    isValid: (value: any) => !!value,
    errorMessage: "Required field",
  }),
  setMinLength: (minLength: number) => ({
    isValid: (value: string) => new RegExp(`.{${minLength}}`, "g").test(value),
    errorMessage: `At least ${minLength} chars`,
  }),
  setMaxLength: (maxLength: number) => ({
    isValid: (value: string) => !new RegExp(`.{${maxLength}}`, "g").test(value),
    errorMessage: `Max ${maxLength} chars`,
  }),
};

export const createFormValidation = <S extends Record<string, any>>(
  initFields: S,
  rules: Partial<IRules<S>>
) => {
  let fields: S = { ...initFields };
  let errors = Object.keys(fields).reduce<Record<keyof S, string>>(
    (prev, next: keyof S) => {
      prev[next] = "";
      return prev;
    },
    {} as any
  );
	let lastIsValid = false

  const Validate = (fieldName: keyof S) => {
    return findAsyncSequential(rules[fieldName] ?? [], async (rule) => {
      if (await rule.isValid(fields[fieldName])) {
        return false;
      } else {
        return true;
      }
    }).then((unvalidRule) => {
      if (unvalidRule) {
				lastIsValid = false
        if (errors[fieldName] != unvalidRule.errorMessage) {
          errors[fieldName] = unvalidRule.errorMessage;
          errorCallbacks.forEach(([fieldN, cb]) => {
            if (fieldN == fieldName) cb();
          });
        }
      } else {
				lastIsValid = true
        if (errors[fieldName] != "") {
          errors[fieldName] = "";
          errorCallbacks.forEach(([fieldN, cb]) => {
            if (fieldN == fieldName) cb();
          });
        }
      }

      return !errors[fieldName].length;
    });
  };

  const validateFields = () => {
    return Object.keys(fields).map((field) => {
      return Validate(field);
    });
  };

  const resetFormFields = () => {
    fields = { ...initFields };
    fieldCallbacks.forEach(([n, cb]) => cb());
  };

  const setField = <V extends keyof S>(fieldName: V, value: S[V]) => {
    fields[fieldName] = value;
    fieldCallbacks.forEach(([fieldN, cb]) => {
      if (fieldN == fieldName) cb();
    });
    Validate(fieldName);
  };

  const fieldCallbacks = new Set<[keyof S, () => void]>();
  const errorCallbacks = new Set<[keyof S, () => void]>();

  const subscribeField = (fieldName: keyof S) => (callback: () => void) => {
    fieldCallbacks.add([fieldName, callback]);
    return () => fieldCallbacks.delete([fieldName, callback]);
  };
  const subscribeError = (fieldName: keyof S) => (callback: () => void) => {
    errorCallbacks.add([fieldName, callback]);
    return () => errorCallbacks.delete([fieldName, callback]);
  };

  const useFieldValue = <F extends keyof S>(fieldName: F) => {
    return useSyncExternalStore(
      subscribeField(fieldName),
      () => fields[fieldName],
    );
  };
  const useFieldError = <F extends keyof S>(fieldName: F) => {
    return useSyncExternalStore(
      subscribeError(fieldName),
      () => errors[fieldName]
    );
  };

  return {
    useFieldValue,
    useFieldError,
    getFields: () => fields,
    setField,
    validateFields,
		isValid: () => lastIsValid,
    resetFormFields,
  };
};
