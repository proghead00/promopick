"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { PROMO_URL } from "@/lib/apiEndpoints";
import axios, { AxiosError } from "axios";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { toast } from "sonner";
import { clearCache } from "@/actions/commonActions";

export const EditPromo = ({
  token,
  promo,
  open,
  setOpen,
}: {
  token: string;
  promo: PromoType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [promopickData, setPromopickData] = useState<PromopickFormType>({
    title: promo.title,
    description: promo.description,
  });
  const [date, setDate] = React.useState<Date | null>(
    new Date(promo.expire_at)
  );
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<PromopickTypeError>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", promopickData?.title ?? "");
      formData.append("description", promopickData?.description ?? "");
      formData.append("expire_at", date?.toISOString() ?? "");

      if (image) {
        formData.append("image", image);
      }
      const { data } = await axios.put(`${PROMO_URL}/${promo.id}`, formData, {
        headers: {
          Authorization: token,
        },
      });

      setLoading(false);
      if (data?.message) {
        clearCache("dashboard");
        setPromopickData({});
        setDate(null);
        setImage(null);
        setErrors({});
        toast.success(data?.message);
        setOpen(false);
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          setErrors(err.response?.data?.errors);
        }
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-md">
          Add Promo
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
        onInteractOutside={(e) => e.preventDefault()} // prevents closing on outside click
      >
        <DialogHeader className="flex justify-center items-center mb-4">
          <DialogTitle className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
            Edit Promo
          </DialogTitle>

          <DialogClose asChild>
            <button
              className="absolute top-3 right-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              aria-label="Close"
            >
              &times;
            </button>
          </DialogClose>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="title"
              className="block text-gray-800 text-sm font-medium mb-2"
            >
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter your title"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100 text-gray-900"
              value={promopickData?.title ?? ""}
              onChange={(e) =>
                setPromopickData({ ...promopickData, title: e.target.value })
              }
            />

            <span className="text-red-500">{errors.title}</span>
          </div>

          <div>
            <Label
              htmlFor="description"
              className="block text-gray-800 text-sm font-medium mb-2"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter your description"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100 text-gray-900"
              value={promopickData?.description ?? ""}
              onChange={(e) =>
                setPromopickData({
                  ...promopickData,
                  description: e.target.value,
                })
              }
            />
            <span className="text-red-500">{errors.description}</span>
          </div>

          <div>
            <Label
              htmlFor="image"
              className="block text-gray-800 text-sm font-medium mb-2"
            >
              Image
            </Label>
            <Input
              onChange={handleImageChange}
              id="image"
              //   accept="image/*"
              type="file"
              placeholder="Upload image"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100 text-gray-900"
            />
            <span className="text-red-500">{errors.image}</span>
          </div>

          <div>
            <Label
              htmlFor="expireAt"
              className="block text-gray-800 text-sm font-medium mb-2"
            >
              Expire At
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full flex items-center justify-between text-gray-900",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date ?? new Date()}
                  onSelect={(date) => setDate(date!)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <span className="text-red-500">{errors.expire_at}</span>
          </div>

          <div>
            <Button
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            >
              {loading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
