import Image from "next/image";
import { StatCard } from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";

export default async function AdminPage() {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6 md:p-12">
      <div className="mx-auto max-w-7xl flex flex-col space-y-14">
        <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo/logo.png"
              height={50}
              width={50}
              alt="Medify"
              className="rounded-full border-2 border-white shadow-md"
            />
            <h1 className="text-3xl font-bold text-white">Medify</h1>
          </div>
          <Button className="text-sm max-sm:hidden text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-300">
            Admin Dashboard
          </Button>
        </header>
        <main className="space-y-12">
          <section className="w-full space-y-4 bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
            <h1 className="text-3xl font-bold text-blue-800">Hey! Admin👋</h1>
            <p className="text-blue-600">
              Start the day with managing new appointments
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              type="appointments"
              count={appointments.scheduledCount}
              label="Scheduled appointments"
              icon="/assets/icon/appointments.svg"
            />
            <StatCard
              type="pending"
              count={appointments.pendingCount}
              label="Pending appointments"
              icon="/assets/icon/pending.svg"
            />
            <StatCard
              type="cancelled"
              count={appointments.cancelledCount}
              label="Cancelled appointments"
              icon="/assets/icon/cancelled.svg"
            />
          </section>

          <DataTable columns={columns} data={appointments.documents} />

          <footer className="text-center text-lg text-white bg-gradient-to-br from-blue-600 to-blue-700 backdrop-blur-md rounded-full py-3 mt-8">
            &copy; 2024{" "}
            <a
              href="https://tarin-agarwal.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Tarin Agarwal
            </a>{" "}
            | Medify
          </footer>
        </main>
      </div>
    </div>
  );
}
