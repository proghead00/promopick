"use client";

import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import CountUp from "react-countup";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import socket from "@/lib/socket";
import { toast } from "sonner";

interface ViewPromoItemsProps {
  promo: PromoType;
}

export const Promoting: React.FC<ViewPromoItemsProps> = ({ promo }) => {
  const [promoComments, setPromoComments] = useState(promo.PromoComments);
  const [promoItems, setPromoItems] = useState(promo.PromoItem);
  const [comment, setComment] = useState("");
  const [votedItemId, setVotedItemId] = useState<number | null>(null);

  const handleVote = (id: number) => {
    if (votedItemId === null) {
      setVotedItemId(id);
      updateCounter(id);

      socket.emit(`promoting-${promo.id}`, {
        promoId: promo.id,
        promoItemId: id,
      });
    }
  };

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

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.length > 2) {
      const payload = {
        id: promo.id,
        comment: comment,
        created_at: new Date().toDateString(),
      };

      updateComment(payload);

      socket.emit(`promoting_comment-${promo.id}`, payload);

      setComment("");
    } else {
      toast.warning("At least two characters are needed to comment");
    }
  };

  useEffect(() => {
    socket.on(`promoting-${promo.id}`, (data) => {
      updateCounter(data?.promoItemId);
    });

    socket.on(`promoting_comment-${promo.id}`, (data) => {
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
                    <div className="flex justify-center items-center mt-4 space-x-2">
                      <CountUp
                        start={0}
                        end={item.count}
                        duration={0.5}
                        className="text-5xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text"
                      />
                      {votedItemId === null && (
                        <Button
                          onClick={() => handleVote(item.id)}
                          className="flex items-center ml-4"
                        >
                          <span className="mr-2">Vote</span>
                          <ThumbsUp />
                        </Button>
                      )}
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
                      <div className="flex justify-center items-center mt-4 space-x-2">
                        <CountUp
                          start={0}
                          end={promoItems[index + 1].count}
                          duration={0.5}
                          className="text-5xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text"
                        />
                        {votedItemId === null && (
                          <Button
                            onClick={() => handleVote(promoItems[index + 1].id)}
                            className="flex items-center ml-4"
                          >
                            <span className="mr-2">Vote</span>
                            <ThumbsUp />
                          </Button>
                        )}
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

      <form className="mt-4 w-full" onSubmit={handleComment}>
        <Textarea
          className="text-black"
          placeholder="Leave a feedback here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button className="w-full mt-2">Submit Feedback</Button>
      </form>

      {/* Comments */}
      <div className="mt-4">
        {promoComments &&
          promoComments.length > 0 &&
          promoComments.map((item, idx) => (
            <div
              className="w-full md:w-[600px] rounded-lg p-4 bg-muted mb-4"
              key={idx}
            >
              <p className=" text-black font-bold">{item.comment}</p>
              <p className=" text-black">
                {new Date(item.created_at).toDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
