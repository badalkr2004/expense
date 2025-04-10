import Link from "next/link";
import { RegisterForm } from "@/components/AuthForms";

export default function RegisterPage() {
  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-b from-light-green to-cream flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-forest-green text-center">Green Expense Tracker</h1>
      <div className="w-full max-w-md">
        <RegisterForm />
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-leaf-green hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 