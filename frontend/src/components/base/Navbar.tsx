"use client";

import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "../common/UserAvatar";
import { LogoutModal } from "../auth/LogoutModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LogoutModal open={open} setOpen={setOpen} />
      <nav className="flex justify-between items-center h-14 p-2 w-full bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
          PromoPick
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}
