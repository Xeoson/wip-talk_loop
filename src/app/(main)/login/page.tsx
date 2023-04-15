"use client";

import browserRoutes from "@/common/browserRoutes";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import PasswordInput from "@/components/Input/PasswordInput";
import { popupActions } from "@/components/common/Popup/slice";
import client from "@/lib/apollo/client";
import { gql } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineGoogle, AiOutlineGithub } from "react-icons/ai";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const defaultValues = { email: "", password: "" };

const validateUserExist = async (email?: string) => {
  const { data } = await client.query({
    query: gql`
      query ($email: String) {
        userExist(email: $email)
      }
    `,
    variables: { email },
  });
  return !data.userExist;
};

const validateRules = yup.object<typeof defaultValues>({
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
      "Invalid format"
    )
    .test("user exist", "User already exist", validateUserExist),
  password: yup.string().min(6, "At least 6 chars"),
});

interface LoginPageProps {}

const LoginPage = (props: LoginPageProps) => {
  const [type, setType] = useState<"SignIn" | "SignUp">("SignIn");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(validateRules),
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = (data: typeof defaultValues) => {
    setIsLoading(true);
    signIn(type.toLowerCase(), { ...data, redirect: false })
      .then((res) => {
        if (res?.error) {
          dispatch(popupActions.setMessage(res.error));
          return;
        }
        router.push(browserRoutes.index);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center px-6 py-4 rounded-md shadow-md bg-cyan-1 grow max-w-modal">
      <h1 className="font-semibold text-md">{type}</h1>
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          disabled={isLoading}
          className="mt-4"
          error={errors.email}
          placeholder="Email"
          setValue={(v) => setValue("email", v)}
          {...register("email", { required: "Required field" })}
        />
        <PasswordInput
          disabled={isLoading}
          className="mt-2"
          error={errors.password}
          placeholder="Password"
          setValue={(v) => setValue("password", v)}
          {...register("password", { required: "Required field" })}
        />
        <Button disabled={isLoading} type="submit" className="w-1/2 mt-3">
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
                setType("SignUp");
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
                setType("SignIn");
              }}
            >
              {"SignIn"}
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
