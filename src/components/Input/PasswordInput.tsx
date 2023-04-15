import { useMemo, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Input, { InputProps } from "./Input";

interface PasswordInputProps extends InputProps {}

const PasswordInput = (props: PasswordInputProps) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleToggleHidden = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
    setIsHidden((prev) => !prev);
  };

  return (
    <Input
      {...props}
      type={isHidden ? "password" : "text"}
      extraChild={
        <button onClick={handleToggleHidden}>
          {isHidden ? <BsEyeFill /> : <BsEyeSlashFill />}
        </button>
      }
    />
  );
};

export default PasswordInput;
