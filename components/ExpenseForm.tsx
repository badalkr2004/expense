"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function ExpenseForm() {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, description, categoryId }),
    })
    if (response.ok) {
      setAmount("")
      setDescription("")
      setCategoryId("")
      // Trigger an event to update the expense list
      const event = new CustomEvent("expenseAdded")
      window.dispatchEvent(event)
    }
  }

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
        className="w-full p-3 bg-leaf-green text-white rounded-lg hover:bg-forest-green transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Expense
      </motion.button>
    </form>
  )
}

