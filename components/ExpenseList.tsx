"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([])

  const fetchExpenses = () => {
    fetch("/api/expenses")
      .then((res) => res.json())
      .then(setExpenses)
  }

  useEffect(() => {
    fetchExpenses()
    window.addEventListener("expenseAdded", fetchExpenses)
    return () => {
      window.removeEventListener("expenseAdded", fetchExpenses)
    }
  }, [fetchExpenses]) // Added fetchExpenses to the dependency array

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      <AnimatePresence>
        {expenses.map((expense) => (
          <motion.div
            key={expense.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 border border-light-green rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <p className="font-semibold text-leaf-green">{expense.description}</p>
            <p className="text-forest-green">Amount: ${expense.amount.toFixed(2)}</p>
            <p className="text-bark-brown">Category: {expense.category.name}</p>
            <p className="text-bark-brown text-sm">{new Date(expense.date).toLocaleDateString()}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

