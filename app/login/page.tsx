import Link from "next/link";
import { LoginForm } from "@/components/AuthForms";

export default function LoginPage() {
  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-b from-light-green to-cream flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-forest-green text-center">Green Expense Tracker</h1>
      <div className="w-full max-w-md">
        <LoginForm />
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link href="/register" className="text-leaf-green hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 