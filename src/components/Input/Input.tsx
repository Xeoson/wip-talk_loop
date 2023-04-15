import { DPInput } from "@/common/types";
import useOutsideClick from "@/hooks/useOutsideClick";
import { ReactNode, useEffect, useRef, useState } from "react";
import {FieldError} from 'react-hook-form'

export interface InputProps extends DPInput {
  error?: FieldError;
  setValue: (value: string) => any;
  extraChild?: ReactNode;
}

const Input = ({ error, setValue, ...props }: InputProps) => {
  const [hasValue, setHasValue] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputFocus = () => {
    if (inputRef.current && !hasFocus) {
      setHasFocus(true);
    }
  };

  const onBlur = () => {
    setHasFocus(false);
  };

  const wrapperRef = useOutsideClick<HTMLDivElement>(onBlur);

  useEffect(() => {
    if (hasFocus) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [hasFocus]);


  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    value.length ? setHasValue(true) : setHasValue(false);
    setValue(value);
  };

  return (
    <div
      ref={wrapperRef}
      className={`text-xs min-w-0 w-full py-1 flex items-center px-2 cursor-text focus-within:shadow-cyan-500/20 focus-within:shadow-2xl transition focus-within:border-neutral-300 border-2 border-neutral-300/80 placeholder:text-neutral-300/80 rounded-lg relative ${
        props.className ?? ""
      }`}
      onClick={handleInputFocus}
    >
      <input
        ref={inputRef}
        {...props}
        className="w-full min-w-0 pt-2 bg-transparent outline-none peer"
        placeholder=""
        onChange={handleSetValue}
      />
      <label
        className={`absolute ml-2 z-[-1] left-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 origin-left transition font-thin peer-focus:-translate-y-2 ${
          hasValue ? "-translate-y-2 scale-75" : ""
        }`}
      >
        {props.placeholder}
      </label>
      {error && (
        <span className="mx-2 text-red-500/90 text-xxs whitespace-nowrap">
          {error.message}
        </span>
      )}
      {props.extraChild}
    </div>
  );
};

export default Input;
