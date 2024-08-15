import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const RegisterPage = () => {
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

        <form className="space-y-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full py-3 px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full py-3 px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            />
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
              type="password"
              placeholder="Enter your password"
              className="w-full py-3 px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            />
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
              type="password"
              placeholder="Confirm your password"
              className="w-full py-3 px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            />
          </div>
          <button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            type="submit"
          >
            Register
          </button>
        </form>

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
