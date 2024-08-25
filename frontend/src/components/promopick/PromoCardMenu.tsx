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
import { DeletePromo } from "./DeletePromo";

// const EditPromo = dynamic(() => import("./EditPromo"));

export const PromoCardMenu = ({
  promo,
  token,
}: {
  promo: PromoType;
  token: string;
}) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      {open && (
        <EditPromo open={open} setOpen={setOpen} promo={promo} token={token} />
      )}

      {deleteOpen && (
        <DeletePromo
          open={deleteOpen}
          setOpen={setDeleteOpen}
          id={promo.id}
          token={token}
        />
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
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
