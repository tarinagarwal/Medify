import clsx from "clsx";
import Image from "next/image";

import { StatusIcon } from "@/constants";

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("flex items-center gap-2 px-3 py-1 rounded-full", {
        "bg-green-100": status === "scheduled",
        "bg-blue-100": status === "pending",
        "bg-red-100": status === "cancelled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={12}
        height={12}
        className="h-3 w-3"
      />
      <p
        className={clsx("text-xs font-semibold capitalize", {
          "text-green-600": status === "scheduled",
          "text-blue-600": status === "pending",
          "text-red-600": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};
