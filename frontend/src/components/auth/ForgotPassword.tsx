"use client";

import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { useFormState } from "react-dom";
import { forgotPasswordAction, loginAction } from "@/actions/authActions";
import { toast } from "sonner";
import { SubmitButton } from "../common/SubmitButton";

const ForgotPassword = () => {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };

  const [state, formAction] = useFormState(forgotPasswordAction, initState);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <div>
      <form action={formAction}>
        <div className="mb-4">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="shadow-md border border-gray-300 rounded-lg w-full py-2 my-5 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="text-red-500">{state.errors?.email}</span>
        </div>

        <div className="flex items-center justify-between">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
