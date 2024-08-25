"use client";

import React, { Dispatch, SetStateAction, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { PROMO_URL } from "@/lib/apiEndpoints";
import axios from "axios";
import { clearCache } from "@/actions/commonActions";

export const DeletePromo = ({
  open,
  setOpen,
  id,
  token,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  token: string;
}) => {
  const [loading, setLoading] = useState(false);

  const deletePromo = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${PROMO_URL}/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (data?.message) {
        setLoading(false);
        clearCache("dashboard");
        toast.success(data.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700">
            This will delete your promo permanently!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-200 text-gray-900 hover:bg-gray-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={deletePromo}
            disabled={loading}
            className="bg-purple-500 text-white hover:bg-purple-600"
          >
            {loading ? "Processing..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
