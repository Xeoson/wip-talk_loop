import { DPInput } from "@/common/types";
import useOutsideClick from "@/hooks/useOutsideClick";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Triangle } from "react-loader-spinner";
import InfoTip from "../InfoTip";

export interface InputProps extends DPInput {
  error?: string | null;
  errorFetching?: boolean;
  setValue: (value: string) => any;
  extraChild?: ReactNode;
}

const Input = ({ error, errorFetching, setValue, placeholder, ...props }: InputProps) => {
  const [hasValue, setHasValue] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    value.length ? setHasValue(true) : setHasValue(false);
    setValue(value);
  };

  return (
    <label
      className={`text-xs min-w-0 w-full py-1 flex items-center px-2 cursor-text focus-within:shadow-cyan-500/20 focus-within:shadow-lg transition focus-within:border-neutral-300 border-2 border-neutral-300/80 placeholder:text-neutral-300/80 rounded-lg relative ${
        props.className ?? ""
      }`}
    >
      <input
        {...props}
        ref={inputRef}
        className="w-full min-w-0 pt-2 bg-transparent outline-none peer"
        onChange={handleSetValue}
      />
      <label
        className={`absolute ml-2 z-[-1] left-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 origin-left transition font-thin peer-focus:-translate-y-2 ${
          hasValue ? "-translate-y-2 scale-75" : ""
        }`}
      >
        {placeholder}
      </label>
      {errorFetching ? (
        <Triangle color="#c9d0d1" wrapperClass="px-1" height={20} width={20} />
      ) : (
        error && <InfoTip className="z-10 mx-2 text-red-500/90" text={error} />
      )}
      {props.extraChild}
    </label>
  );
};
export default Input;
