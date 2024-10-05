import clsx from "clsx";
import Image from "next/image";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

export function StatCard({ count = 0, label, icon, type }: StatCardProps) {
  return (
    <div
      className={clsx(
        "bg-blue-50 bg-opacity-90 backdrop-blur-lg rounded-3xl p-6 shadow-xl transition-transform duration-300 hover:scale-105",
        {
          "border-t-4 border-blue-500": type === "appointments",
          "border-t-4 border-yellow-500": type === "pending",
          "border-t-4 border-red-500": type === "cancelled",
        }
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className={clsx("p-3 rounded-full", {
            "bg-gradient-to-r from-blue-500 to-blue-600":
              type === "appointments",
            "bg-gradient-to-r from-yellow-500 to-yellow-600":
              type === "pending",
            "bg-gradient-to-r from-red-500 to-red-600": type === "cancelled",
          })}
        >
          <Image
            src={icon}
            height={32}
            width={32}
            alt={type}
            className="size-8 w-fit"
          />
        </div>
        <h2 className="text-4xl font-bold text-blue-800">{count}</h2>
      </div>
      <p className="text-lg text-blue-600">{label}</p>
    </div>
  );
}
