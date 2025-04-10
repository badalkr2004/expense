"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Save token to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({
        id: data.id,
        email: data.email,
        name: data.name,
      }));

      // Redirect to dashboard
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-leaf-green">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
        )}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-light-green rounded-lg"
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <motion.input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-light-green rounded-lg"
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-leaf-green hover:bg-forest-green text-white"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-leaf-green">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg">
            Registration successful! Redirecting to login...
          </div>
        )}
        <div>
          <label className="block text-gray-700 mb-1">Name (Optional)</label>
          <motion.input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-light-green rounded-lg"
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-light-green rounded-lg"
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <motion.input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-light-green rounded-lg"
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || success}
          className="w-full bg-leaf-green hover:bg-forest-green text-white"
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
} 