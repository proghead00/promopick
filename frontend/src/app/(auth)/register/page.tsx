import React from "react";
import Link from "next/link";
import Register from "@/components/auth/Register";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-700 to-pink-600">
      <div className="w-full md:w-[550px] shadow-lg rounded-xl py-8 px-10 bg-white">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
            PromoPick
          </h1>
          <h2 className="text-3xl font-bold text-gray-900">Register</h2>
          <p className="text-gray-600">Choose your favourite promo!</p>
        </div>

        <Register />

        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <strong>
            <Link href="/login" className="text-purple-500">
              Login
            </Link>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
