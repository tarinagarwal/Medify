import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import {
  Calendar,
  CheckCircle,
  Notebook,
  User2,
  Bell,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

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
              <Notebook className="h-6 w-6" />
              <span>Less Paper Work</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="h-6 w-6" />
              <span>Appointment Reminders</span>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 bg-white shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
              <div className="flex items-center justify-center space-x-4">
                <CheckCircle className="h-12 w-12 text-green-400" />
                <CardTitle className="text-3xl font-bold">
                  Appointment Request Successful
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-800">
                  Your{" "}
                  <span className="text-green-500">appointment request</span>{" "}
                  has been successfully submitted!
                </h2>
                <p className="text-blue-600 text-lg">
                  We&apos;ll be in touch shortly to confirm.
                </p>
              </div>

              <Card className="bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-6 bg-blue-100 p-4 rounded-lg flex-col xl:flex-row">
                    <Image
                      src={doctor?.image!}
                      alt="doctor"
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-white shadow-md"
                    />
                    <div>
                      <p className="font-bold text-2xl text-blue-800">
                        Dr. {doctor?.name}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
                      <Calendar className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-blue-800 mb-1">
                          Date & Time
                        </p>
                        <p className="text-blue-600">
                          {formatDateTime(appointment.schedule).dateTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
                      <User2 className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-blue-800 mb-1">
                          Reason for Visit
                        </p>
                        <p className="text-blue-600">{appointment.reason}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-4 mb-2">
                      <Notebook className="h-6 w-6 text-blue-600" />
                      <p className="font-semibold text-blue-800">
                        Additional Notes
                      </p>
                    </div>
                    <p className="text-blue-600 pl-10">
                      {appointment.note || "No additional notes provided."}
                    </p>
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center">
                <Image
                  src="/assets/images/tenor.gif"
                  height={200}
                  width={200}
                  alt="success"
                  className="rounded-full shadow-lg border-4 border-blue-300"
                />
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">What's Next</h2>
                <ul className="space-y-3">
                  {[
                    {
                      icon: CheckCircle,
                      text: "Arrive 10 minutes early for your appointment.",
                    },
                    {
                      icon: CheckCircle,
                      text: "Bring any necessary documents or medical records.",
                    },
                    {
                      icon: CheckCircle,
                      text: "Prepare any questions you'd like to ask your doctor.",
                    },
                    {
                      icon: CheckCircle,
                      text: "Follow any pre-visit instructions from your doctor.",
                    },
                    {
                      icon: CheckCircle,
                      text: "Wear comfortable clothing for any necessary physical examinations.",
                    },
                    {
                      icon: CheckCircle,
                      text: "Stay hydrated and eat a light meal before your visit, if applicable.",
                    },
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
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white transition-colors duration-300 text-lg px-6 py-3 rounded-full shadow-md"
            asChild
          >
            <Link
              href={`/patients/${userId}/new-appointment`}
              className="flex items-center"
            >
              Book Another Appointment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
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
};

export default RequestSuccess;
