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
      <nav className="flex justify-between items-center h-16 px-6 bg-gradient-to-r from-purple-800 to-pink-700 shadow-md rounded-b-lg">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-yellow-300 to-orange-500 text-transparent bg-clip-text">
          PromoPick
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-white border border-gray-200 rounded-md shadow-lg">
            <DropdownMenuLabel className="text-gray-800">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-gray-100">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-gray-100"
              onClick={() => setOpen(true)}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}
