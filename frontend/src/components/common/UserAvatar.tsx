"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";

export const UserAvatar = ({ name }: { name: string }) => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>Sus</AvatarFallback>
    </Avatar>
  );
};
