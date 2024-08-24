"use client";

import React, { Dispatch, SetStateAction } from "react";

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

import { signOut } from "next-auth/react";

export const LogoutModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const logoutUser = () => {
    signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700">
            This will log you out and you would have to login with your
            credentials again!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-200 text-gray-900 hover:bg-gray-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={logoutUser}
            className="bg-purple-500 text-white hover:bg-purple-600"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
