"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthProvider";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const { token } = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ name }),
    });
    if (response.ok) {
      setName("");
      // Trigger an event to update the category list
      const event = new CustomEvent("categoryAdded");
      window.dispatchEvent(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <motion.input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        required
        className="w-full p-3 border border-light-green rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
        whileFocus={{ scale: 1.02 }}
      />
      <motion.button
        type="submit"
        className="w-full p-3 bg-forest-green text-white rounded-lg hover:bg-leaf-green transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Category
      </motion.button>
    </form>
  );
}
