"use client";

import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { SubmitButton } from "../common/SubmitButton";
import { useFormState } from "react-dom";
import { loginAction } from "@/actions/authActions";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const Login = () => {
  const initState = {
    status: 0,
    message: "",
    errors: {},
    data: {},
  };

  const [state, formAction] = useFormState(loginAction, initState);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      signIn("credentials", {
        email: state.data?.email,
        password: state.data?.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    }
  }, [state]);

  return (
    <div>
      <form action={formAction}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="shadow-md border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="text-red-500">{state.errors?.email}</span>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="shadow-md border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="text-red-500">{state.errors?.password}</span>
        </div>
        <div className="flex items-center justify-between">
          <SubmitButton />
          <a
            className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-700"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
