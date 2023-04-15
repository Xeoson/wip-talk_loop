import { DPButton } from "@/common/types";

export interface ButtonProps extends DPButton {}

const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`text-sm rounded-lg bg-cyan-2 py-1 shadow-md shadow-cyan-700/30 hover:bg-cyan-600/95 transition px-3 ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
