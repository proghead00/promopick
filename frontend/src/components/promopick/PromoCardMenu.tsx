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
import Env from "@/lib/env";
import { toast } from "sonner";

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

  const handleCopy = () => {
    navigator.clipboard?.writeText(`${Env.APP_URL}/promo/${promo.id}`);
    toast.success("Link has been copied to clipboard");
  };

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
          <DropdownMenuItem onClick={handleCopy}>Copy Link</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
