"use client";

import browserRoutes from "@/common/browserRoutes";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import PasswordInput from "@/components/Input/PasswordInput";
import { popupActions } from "@/components/common/Popup/slice";
import {
  IRules,
  createFormValidation,
  defaultValidateRules,
} from "@/hooks/createFormValidation";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import client from "@/lib/apollo/client";
import { gql } from "@apollo/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { emailRegexp } from "./common/const";

interface IDefaultValues {
  email: string;
  emailFetching: boolean;
  password: string;
  type: "SignIn" | "SignUp";
}

const defaultValues: IDefaultValues = {
  email: "",
  password: "",
  emailFetching: false,
  type: "SignIn",
};

const validateUserExisting = async (email?: string) => {
  const { data } = await client.query({
    query: gql`
      query ($email: String) {
        userExist(email: $email)
      }
    `,
    variables: { email: email?.toLocaleLowerCase() },
  });
  return data.userExist;
};

const rules: Partial<IRules<IDefaultValues>> = {
  email: [
    {
      isValid: (val) => new RegExp(emailRegexp, "g").test(val),
      errorMessage: "Invalid format",
    },
    {
      isValid: async (value) => {
        if (getFields().type == "SignIn") {
          setField("emailFetching", true);
          const isExist = await validateUserExisting(value);
          setField("emailFetching", false);
          return isExist;
        }
        return true;
      },
      errorMessage: "User not exist",
    },
    {
      isValid: async (value) => {
        if (getFields().type == "SignUp") {
          setField("emailFetching", true);
          const isExist = await validateUserExisting(value);
          setField("emailFetching", false);
          return !isExist;
        }
        return true;
      },
      errorMessage: "User already exist",
    },
  ],
  password: [defaultValidateRules.setMinLength(6)],
};

const {
  setField,
  useFieldError,
  useFieldValue,
  getFields,
  validateFields,
  isValid,
} = createFormValidation(defaultValues, rules);

interface LoginPageProps {}

const LoginPage = (props: LoginPageProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const type = useFieldValue("type");
  const emailError = useFieldError("email");
  const isEmailFetching = useFieldValue("emailFetching");
  const passwordError = useFieldError("password");

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid()) return;

    const { email, password, type } = getFields();
    setIsLoading(true);
    try {
      const res = await signIn(type.toLowerCase(), {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        return dispatch(popupActions.setMessage(res.error));
      }
      router.push(browserRoutes.index);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffectAfterMount(() => {
    validateFields();
  }, [type]);

  return (
    <div className="flex flex-col items-center px-6 py-4 rounded-md shadow-md bg-cyan-1 grow max-w-modal">
      <h1 className="font-semibold text-md">{type}</h1>
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit}
      >
        <Input
          disabled={isLoading}
          className="mt-4"
          error={emailError}
          errorFetching={isEmailFetching}
          placeholder="Email"
          setValue={(v) => setField("email", v)}
        />
        <PasswordInput
          disabled={isLoading}
          className="mt-2"
          error={passwordError}
          placeholder="Password"
          setValue={(v) => setField("password", v)}
        />
        <Button
          disabled={isLoading || isEmailFetching || !isValid()}
          type="submit"
          className="w-1/2 mt-3"
        >
          Submit
        </Button>
      </form>

      <div className="text-xxs mt-1.5 flex space-x-1">
        {type == "SignIn" ? (
          <>
            <p className="whitespace-nowrap">{"Not registered?"}</p>
            <button
              className="underline"
              onClick={() => {
                setField("type", "SignUp");
              }}
            >
              SignUp
            </button>
          </>
        ) : (
          <>
            <p className="whitespace-nowrap">{"Already have account?"}</p>
            <button
              className="underline"
              onClick={() => {
                setField("type", "SignIn");
              }}
            >
              SignIn
            </button>
          </>
        )}
      </div>
      <div className="flex mt-4 space-x-2">
        <button
          className="p-1 text-lg rounded-full bg-cyan-2"
          onClick={() => signIn("google")}
        >
          <AiOutlineGoogle />
        </button>
        <button
          className="p-1 text-lg rounded-full bg-cyan-2"
          onClick={() => signIn("github")}
        >
          <AiOutlineGithub />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
