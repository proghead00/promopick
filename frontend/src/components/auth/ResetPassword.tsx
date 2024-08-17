"use client";

import React, { useEffect } from "react";
import { SubmitButton } from "../common/SubmitButton";
import { Input } from "../ui/input";
import { registerAction, resetPasswordAction } from "@/actions/authActions";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";

const ResetPassword = () => {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };

  const [state, formAction] = useFormState(resetPasswordAction, initState);
  const sParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="token" value={sParams.get("token") ?? ""} />
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full py-3 px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
          readOnly
          value={sParams.get("email") ?? ""}
        />
        <span className="text-red-500">{state.errors?.email}</span>
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full py-3 px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
        />
        <span className="text-red-500">{state.errors?.password}</span>
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="confirm_password"
        >
          Confirm Password
        </label>
        <Input
          id="confirm_password"
          name="confirm_password"
          type="password"
          placeholder="Confirm your password"
          className="w-full py-3 px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
        />
        <span className="text-red-500">{state.errors?.confirm_password}</span>
      </div>
      <SubmitButton />
    </form>
  );
};

export default ResetPassword;
