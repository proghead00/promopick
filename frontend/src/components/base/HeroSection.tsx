import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center flex-col">
      <div className="absolute inset-0">
        <Image
          src="/banner_img.svg"
          alt="banner_img"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="relative z-10 flex justify-center items-center flex-col">
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text">
          PromoPick
        </h1>
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-200 text-center">
          Choose the promo that packs the punch!
        </p>
        <Link href="/login">
          <Button className=" mt-4 text-lg">Get started here</Button>
        </Link>
      </div>
    </div>
  );
};
