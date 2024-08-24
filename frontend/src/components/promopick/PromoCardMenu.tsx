"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import dynamic from "next/dynamic";
import { EditPromo } from "./EditPromo";

// const EditPromo = dynamic(() => import("./EditPromo"));

export const PromoCardMenu = ({
  promo,
  token,
}: {
  promo: PromoType;
  token: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <EditPromo open={open} setOpen={setOpen} promo={promo} token={token} />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>Copy Link</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
