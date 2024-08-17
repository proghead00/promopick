"use server";

import {
  CHECK_CREDENTIALS_URL,
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  REGISTER_URL,
  RESET_PASSWORD,
  RESET_PASSWORD_URL,
} from "@/lib/apiEndpoints";
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
    const { data } = await axios.post(CHECK_CREDENTIALS_URL, {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    return {
      status: 200,
      message: data?.message ?? "Logging you in",
      errors: {},
      data: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 422) {
        return {
          status: 422,
          message: err.response?.data?.message,
          errors: err.response?.data?.errors,
          data: {},
        };
      }
    }

    return {
      status: 500,
      message: "Something went wrong, please try again",
      errors: {},
      data: {},
    };
  }
}

export async function forgotPasswordAction(prevState: any, formData: FormData) {
  try {
    const { data } = await axios.post(FORGOT_PASSWORD_URL, {
      email: formData.get("email"),
    });

    return {
      status: 200,
      message: data?.message ?? "Please check your email inbox",
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

export async function resetPasswordAction(prevState: any, formData: FormData) {
  try {
    const { data } = await axios.post(RESET_PASSWORD_URL, {
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
      token: formData.get("token"),
    });

    return {
      status: 200,
      message:
        data?.message ?? "Password has been reset succesfuly. Login again!",
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
