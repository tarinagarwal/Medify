import Image from "next/image";
import {
  Bell,
  Calendar,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { Button } from "@/components/ui/button";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 shadow-lg">
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
          <div className="hidden md:flex items-center space-x-6 text-white">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Flexibility</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="h-6 w-6" />
              <span>Appointment Reminders</span>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 bg-white shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <CardTitle className="text-3xl font-bold">
                Book Your Appointment
              </CardTitle>
              <p className="mt-2 text-blue-100">
                Schedule your visit with ease and convenience in just 10
                seconds!
              </p>
            </CardHeader>
            <CardContent className="p-6">
              
              <AppointmentForm
                type="create"
                userId={userId}
                patientId={patient.$id}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Why Choose Medify?
                </h2>
                <ul className="space-y-3">
                  {[
                    { icon: Calendar, text: "Easy online scheduling" },
                    { icon: Clock, text: "Minimal wait times" },
                    { icon: MapPin, text: "Convenient locations" },
                    { icon: Phone, text: "24/7 patient support" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="bg-blue-500 p-2 rounded-full">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-blue-800">
                  Booking Steps
                </h2>
                <ul className="space-y-3">
                  {[
                    "Choose your preferred doctor",
                    "Select a convenient date and time",
                    "Provide reason for visit",
                    "Confirm your appointment",
                  ].map((step, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-3 text-blue-700"
                    >
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center">
                <Image
                  src="/logo/appointment-img.png"
                  width={200}
                  height={200}
                  alt="Medify | Trust The Process"
                  className="rounded-xl mb-4 object-cover shadow-lg"
                />
                <h2 className="text-2xl font-semibold mb-2 text-blue-800 text-center">
                  Trust The Process
                </h2>
                <p className="text-blue-600 text-center mb-4">
                  Your health journey starts with a single appointment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
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
        </div>
      </div>
    </div>
  );
}
