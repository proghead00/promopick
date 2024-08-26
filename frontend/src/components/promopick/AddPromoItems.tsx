"use client";

import { Upload } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { PROMO_ITEMS_URL } from "@/lib/apiEndpoints";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const AddPromoItems = ({
  token,
  promoId,
}: {
  token: string;
  promoId: number;
}) => {
  const router = useRouter();

  const [items, setItems] = useState<Array<PromopickItemForm>>([
    {
      image: null,
    },
    {
      image: null,
    },
  ]);

  const [urls, setUrls] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  const imgRef1 = useRef<HTMLInputElement | null>(null);
  const imgRef2 = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const updatedItems = [...items];
      updatedItems[index].image = file;
      setItems(updatedItems);

      const imageUrl = URL.createObjectURL(file);
      const updatedUrls = [...urls];
      updatedUrls[index] = imageUrl;
      setUrls(updatedUrls);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", promoId.toString());

      items.map((item) => {
        if (item.image) {
          formData.append(`images[]`, item.image);
        }
      });

      if (formData.get("images[]")) {
        setLoading(true);

        const { data } = await axios.post(`${PROMO_ITEMS_URL}`, formData, {
          headers: {
            Authorization: token,
          },
        });

        if (data?.message) {
          toast.success(data?.message);
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }

        setLoading(false);
      } else {
        toast.warning("Please upload both the images");
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          if (err?.response?.data?.errors) {
            err?.response?.data?.errors?.map((error: string) => {
              toast.error(error);
            });
          }
        }
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  };

  return (
    <div className="mt-10 px-6 lg:px-20">
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-12 lg:space-y-0 lg:space-x-12">
        {/* First Promo Block */}
        <input
          type="file"
          className="hidden"
          ref={imgRef1}
          accept="image/*"
          onChange={(e) => handleImageChange(e, 0)}
        />

        <div className="w-full lg:w-[500px] flex justify-center flex-col">
          <div
            className="flex justify-center items-center rounded-md border-2 border-dashed p-8 h-[300px] bg-white shadow-sm"
            onClick={() => imgRef1?.current?.click()}
          >
            {urls.length > 0 && urls?.[0] !== "" ? (
              <Image
                src={urls?.[0]}
                width={500}
                height={500}
                alt="preview-1"
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex space-x-2 text-xl text-black">
                <Upload /> <span>Upload image</span>
              </h1>
            )}
          </div>
        </div>

        {/* OR Divider */}
        <div className="flex justify-center items-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text">
            OR
          </h1>
        </div>

        {/* Second Promo Block */}
        <div className="w-full lg:w-[500px] flex justify-center flex-col">
          <input
            type="file"
            onChange={(e) => handleImageChange(e, 1)}
            className="hidden"
            ref={imgRef2}
            accept="image/*"
          />

          <div
            className="flex justify-center items-center rounded-md border-2 border-dashed p-8 h-[300px] bg-white shadow-sm"
            onClick={() => imgRef2?.current?.click()}
          >
            {urls.length > 0 && urls?.[1] !== "" ? (
              <Image
                src={urls?.[1]}
                width={500}
                height={500}
                alt="preview-1"
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex space-x-2 text-xl text-black">
                <Upload /> <span>Upload image</span>
              </h1>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Button onClick={handleSubmit} disabled={loading} className="w-52">
          {loading ? "Processing..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};
