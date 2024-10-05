"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Appointment } from "@/types/appwrite.types";

import AppointmentForm from "./forms/AppointmentForm";

import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

export const AppointmentModal = ({
  patientId,
  userId,
  appointment,
  type,
  title,
  description,
}: {
  patientId: string;
  userId: string;
  appointment?: Appointment;
  type: "schedule" | "cancel";
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={clsx(
            "capitalize text-sm font-medium",
            type === "schedule"
              ? "text-green-600 hover:text-green-700"
              : "text-red-600 hover:text-red-700"
          )}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white rounded-3xl p-6 shadow-xl max-w-md mx-auto">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="text-2xl font-bold text-blue-800">
            {title}
          </DialogTitle>
          <DialogDescription className="text-blue-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
