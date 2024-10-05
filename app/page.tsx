import Image from "next/image";
import Link from "next/link";
import { Heart, Stethoscope, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientForm from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {isAdmin && <PasskeyModal />}
        <header className="flex items-center justify-between mb-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 shadow-lg">
          <Link href="/">
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
          </Link>
          <Link
            href="/?admin=true"
            className="text-sm text-blue-700 flex items-center bg-white px-4 py-2 rounded-full shadow-md hover:bg-blue-50 transition-colors duration-300"
          >
            Admin Login
          </Link>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden border-t-4 border-blue-500">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <CardTitle className="text-3xl font-bold">
                Welcome to Medify
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-blue-800 mb-6 text-lg">
                Your trusted healthcare management system. We prioritize your
                health and well-being with cutting-edge technology and
                compassionate care.
              </p>
              <PatientForm />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="flex flex-col justify-between h-full p-6">
              <div>
                <Image
                  src="/logo/heroimg.png"
                  width={400}
                  height={250}
                  alt="Medify | Trust The Process"
                  className="rounded-xl mb-6 w-full object-cover shadow-lg"
                />
                <h2 className="text-3xl font-bold mb-2">Trust The Process</h2>
                <p className="text-blue-100 text-lg">
                  An apple a day keeps a doctor away!
                </p>
              </div>
              <div className="mt-6">
                <Button
                  variant="secondary"
                  className="w-full text-blue-700 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: User,
                label: "Patient-Centric",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Stethoscope,
                label: "Expert Care",
                color: "from-blue-600 to-blue-700",
              },
              {
                icon: Heart,
                label: "Compassionate",
                color: "from-blue-700 to-blue-800",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <CardContent className="flex flex-col items-center p-6">
                  <div
                    className={`bg-gradient-to-r ${item.color} p-4 rounded-full mb-4 shadow-lg`}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-blue-800">
                    {item.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
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
