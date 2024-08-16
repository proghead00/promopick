import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const Login = () => {
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

        <form>
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
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-700"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>

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

export default Login;
