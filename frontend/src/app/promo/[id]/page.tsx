import Navbar from "@/components/base/Navbar";
import { fetchSinglePromo } from "@/fetch/promoFetch";
import React from "react";
import { Promoting } from "../../../components/promopick/Promoting";

const PromoItems = async ({ params }: { params: { id: number } }) => {
  const promo: PromoType | null = await fetchSinglePromo(params.id);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="mt-8 mx-auto max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-purple-700 text-center">
          {promo?.title}
        </h1>
        <p className="mt-4 text-lg text-gray-700 text-center">
          {promo?.description}
        </p>

        {promo && <Promoting promo={promo!} />}
      </div>
    </div>
  );
};

export default PromoItems;
