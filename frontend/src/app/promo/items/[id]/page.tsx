import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import Navbar from "@/components/base/Navbar";
import { AddPromoItems } from "@/components/promopick/AddPromoItems";
import { fetchSinglePromo } from "@/fetch/promoFetch";
import { getServerSession } from "next-auth";
import React from "react";

const PromoItems = async ({ params }: { params: { id: number } }) => {
  const promo: PromoType | null = await fetchSinglePromo(params.id);
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="mt-8 mx-auto max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-purple-700">{promo?.title}</h1>
        <p className="mt-4 text-lg text-gray-700">{promo?.description}</p>
      </div>

      <AddPromoItems token={session?.user?.token!} promoId={params.id} />
    </div>
  );
};

export default PromoItems;
