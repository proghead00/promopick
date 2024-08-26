"use client";

import socket from "@/lib/socket";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import CountUp from "react-countup";

interface ViewPromoItemsProps {
  promo: PromoType;
}

export const ViewPromoItems: React.FC<ViewPromoItemsProps> = ({ promo }) => {
  const [promoComments, setPromoComments] = useState(promo.PromoComments);
  const [promoItems, setPromoItems] = useState(promo.PromoItem);

  const updateCounter = (id: number) => {
    setPromoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const updateComment = (payload: any) => {
    if (promoComments && promoComments.length > 0) {
      setPromoComments([payload, ...promoComments]);
    } else {
      setPromoComments([payload]);
    }
  };

  useEffect(() => {
    socket.on(`promoting-${promo.id}`, (data) => {
      console.log("data on client side -> ", data);
      updateCounter(data?.promoItemId);
    });

    socket.on(`promoting_comment-${promo.id}`, (data) => {
      console.log("comment on client side -> ", data);
      updateComment(data);
    });
  }, []);

  return (
    <div className="mt-10">
      {promoItems && promoItems.length > 0 && (
        <Fragment>
          {promoItems.reduce((acc, item, index) => {
            if (index % 2 === 0) {
              acc.push(
                <div
                  key={index}
                  className="flex justify-center items-start space-x-12 my-12"
                >
                  {/* Left Promo Item */}
                  <div className="w-full lg:w-[700px] flex flex-col items-center">
                    <div className="flex-grow flex justify-center items-center rounded-md bg-white shadow-sm">
                      <Image
                        src={getImageUrl(item.image)}
                        width={500}
                        height={500}
                        alt={`preview-${index}`}
                        className="w-full h-[300px] object-contain"
                      />
                    </div>
                    <div className="flex justify-center items-center mt-4">
                      <CountUp
                        start={0}
                        end={item.count}
                        duration={0.5}
                        className="text-5xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text"
                      />
                    </div>
                  </div>

                  {/* OR Divider */}
                  {promoItems[index + 1] && (
                    <div className="flex justify-center items-center">
                      <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text">
                        OR
                      </h1>
                    </div>
                  )}

                  {/* Right Promo Item */}
                  {promoItems[index + 1] && (
                    <div className="w-full lg:w-[700px] flex flex-col items-center">
                      <div className="flex-grow flex justify-center items-center rounded-md bg-white shadow-sm">
                        <Image
                          src={getImageUrl(promoItems[index + 1].image)}
                          width={500}
                          height={500}
                          alt={`preview-${index + 1}`}
                          className="w-full h-[300px] object-contain"
                        />
                      </div>
                      <div className="flex justify-center items-center mt-4">
                        <CountUp
                          start={0}
                          end={item.count}
                          duration={0.5}
                          className="text-5xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return acc;
          }, [] as JSX.Element[])}
        </Fragment>
      )}

      {/* Comments */}
      <div className="mt-4">
        {promoComments &&
          promoComments.length > 0 &&
          promoComments.map((item, idx) => (
            <div
              className="w-full md:w-[600px] rounded-lg p-4 bg-muted mb-4"
              key={idx}
            >
              <p className="font-bold">{item.comment}</p>
              <p>{new Date(item.created_at).toDateString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
