import Navbar from "@/components/base/Navbar";
import { AddPromo } from "@/components/promopick/AddPromo";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchPromos } from "../../fetch/promoFetch";
import { PromoCard } from "@/components/promopick/PromoCard";

const DashboardPage = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  const promos: Array<PromoType> | [] = await fetchPromos(
    session?.user?.token!
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end mb-6">
          <AddPromo user={session?.user!} />
        </div>

        <div className="mt-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {promos.length > 0 ? (
            promos.map((item, idx) => (
              <PromoCard promo={item} key={idx} token={session?.user?.token} />
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg font-semibold">
              No promos available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
