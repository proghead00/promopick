"use server";

import { LOGIN_URL, REGISTER_URL } from "@/lib/apiEndpoints";
import axios, { AxiosError } from "axios";

export async function registerAction(prevState: any, formData: FormData) {
  try {
    const { data } = await axios.post(REGISTER_URL, {
      name: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    });

    return {
      status: 200,
      message:
        data?.message ??
        "Account created successfully. Check your email inbox!",
      errors: {},
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 422) {
        return {
          status: 422,
          message: err.response?.data?.message,
          errors: err.response?.data?.errors,
        };
      }
    }

    return {
      status: 500,
      message: "Something went wrong, please try again",
      errors: {},
    };
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const { data } = await axios.post(LOGIN_URL, {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    return {
      status: 200,
      message: data?.message ?? "Logging you in",
      errors: {},
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 422) {
        return {
          status: 422,
          message: err.response?.data?.message,
          errors: err.response?.data?.errors,
        };
      }
    }

    return {
      status: 500,
      message: "Something went wrong, please try again",
      errors: {},
    };
  }
}
