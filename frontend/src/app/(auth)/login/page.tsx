import React from "react";
import Link from "next/link";
import Login from "@/components/auth/Login";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-700 to-pink-600">
      <div className="w-full md:w-[550px] shadow-lg rounded-xl py-5 px-10 bg-white">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
            PromoPick
          </h1>
          <h1 className="text-3xl font-bold text-gray-900">Login</h1>
          <p className="text-gray-600">Welcome back</p>
        </div>
        <Login />
        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <strong>
            <Link href="/register" className="text-purple-500">
              Register
            </Link>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
