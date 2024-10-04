import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { Leaf, Shield, UserPlus } from "lucide-react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

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
              <Leaf className="h-6 w-6" />
              <span>Holistic Care</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserPlus className="h-6 w-6" />
              <span>Easy Registration</span>
            </div>
          </div>
        </header>

        <div className="grid gap-8">
          <Card className="md:col-span-2 bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden border-t-4 border-blue-500">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <CardTitle className="text-3xl font-bold">
                Let us know more about yourself
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <RegisterForm user={user} />
            </CardContent>
          </Card>
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

export default Register;
