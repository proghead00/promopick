"use client";

import React, { useState } from "react";
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

export const AddPromo = () => {
  const [open, setOpen] = useState(false);
  const [promopickData, setPromopickData] = useState<PromopickType>({});
  const [date, setDate] = React.useState<Date>();

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
        <DialogHeader>
          <DialogTitle className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
            Create Promo
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

        <form>
          <div className="mt-4">
            <Label
              htmlFor="title"
              className="block text-gray-800 text-sm font-medium"
            >
              Title
            </Label>

            <Input
              id="title"
              placeholder="Enter your title"
              className="w-full py-2 px-4 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100 text-gray-900"
              value={promopickData?.title ?? ""}
              onChange={(e) =>
                setPromopickData({ ...promopickData, title: e.target.value })
              }
            />
          </div>

          <div className="mt-4">
            <Label
              htmlFor="description"
              className="block text-gray-800 text-sm font-medium"
            >
              Description
            </Label>

            <Textarea
              id="description"
              placeholder="Enter your description"
              className="w-full py-2 px-4 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100 text-gray-900"
              value={promopickData?.description ?? ""}
              onChange={(e) =>
                setPromopickData({
                  ...promopickData,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="mt-4">
            <Label
              htmlFor="image"
              className="block text-gray-800 text-sm font-medium"
            >
              Image
            </Label>

            <Input
              id="image"
              type="file"
              placeholder="Upload image"
              className="w-full py-2 px-4 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100 text-gray-900"
            />
          </div>

          <div className="mt-4">
            <Label
              htmlFor="expireAt"
              className="block text-gray-800 text-sm font-medium"
            >
              Expire At
            </Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal text-gray-900",
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
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
