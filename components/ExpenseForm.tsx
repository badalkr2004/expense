"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Category } from "@/types/index.types";
import { useAuth } from "@/components/AuthProvider";

export default function ExpenseForm() {

  const [loading,setLoading] = useState(false)
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    
    fetch("/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setCategories);
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    
    if (!token) return;
    
    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({ amount, description, categoryId }),
    });
    
    if (response.ok) {
      setAmount("");
      setDescription("");
      setCategoryId("");
      setLoading(false)
      // Trigger an event to update the expense list
      const event = new CustomEvent("expenseAdded");
      window.dispatchEvent(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <motion.input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        className="w-full p-3 border border-light-green rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
        whileFocus={{ scale: 1.02 }}
      />
      <motion.input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="w-full p-3 border border-light-green rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
        whileFocus={{ scale: 1.02 }}
      />
      <motion.select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
        className="w-full p-3 border border-light-green rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
        whileFocus={{ scale: 1.02 }}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </motion.select>
      <motion.button
        type="submit"
        className={`${loading?"opacity-60":""} w-full p-3 bg-leaf-green text-white rounded-lg hover:bg-forest-green transition-colors duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={loading}
      >
        {loading?(<div role="status">
    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>): "Add Expense"}
      </motion.button>
    </form>
  );
}
