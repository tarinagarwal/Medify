"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { XIcon, ShieldCheck } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

export const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (path)
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
  }, [encryptedKey, path, router]);

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);

      localStorage.setItem("accessKey", encryptedKey);

      setOpen(false);
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-gray-100 rounded-lg shadow-lg w-[90%] max-w-md mx-auto p-4 sm:p-6">
        <AlertDialogHeader className="space-y-2">
          <AlertDialogTitle className="flex items-center text-lg sm:text-xl font-semibold text-blue-700">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
            Admin Access
            <XIcon
              onClick={closeModal}
              className="ml-auto cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-300"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm sm:text-base text-gray-600">
            To access the admin page, please enter the 6-digit passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 sm:my-6">
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
            className="flex justify-center"
          >
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="w-8 h-10 sm:w-10 sm:h-12 text-center text-lg font-medium border border-blue-200 rounded-md bg-blue-50 text-blue-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="mt-4 text-center text-red-600 font-medium text-sm">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={validatePasskey}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 text-sm sm:text-base"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
