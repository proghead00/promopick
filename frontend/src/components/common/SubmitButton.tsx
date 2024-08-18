"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className="flex justify-center">
      <button
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
        type="submit"
      >
        {pending ? "Processing.." : "Submit"}
      </button>
    </div>
  );
}
