"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import { PromoCardMenu } from "./PromoCardMenu";
import Link from "next/link";

export const PromoCard = ({
  promo,
  token,
}: {
  promo: PromoType;
  token: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center flex-row">
        {/* promo -> coming from backend */}

        <CardTitle>{promo.title}</CardTitle>

        <PromoCardMenu promo={promo} token={token} />
      </CardHeader>
      <CardContent>
        {promo?.image && (
          <Image
            src={getImageUrl(promo.image)}
            alt={promo.title}
            width={500}
            height={500}
            className="rounded-md w-full h-[220px] object-contain"
          />
        )}

        <p>{promo.description}</p>
        <p>
          <strong>Will expire on: </strong>
          {new Date(promo.expire_at).toDateString()}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/promo/items/${promo.id}`}>
          <Button>Item</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
