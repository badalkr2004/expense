"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expense } from "@/types/index.types";
import { Trash, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();

  const fetchExpenses = () => {
    if (!token) return;

    fetch("/api/expenses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
        setTotalAmount(
          data.reduce(
            (acc: number, expense: Expense) => acc + expense.amount,
            0
          )
        );
      });
  };

  const deleteExpense = (id: string) => {
    if (!token) return;

    fetch(`/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetchExpenses();
        window.dispatchEvent(new CustomEvent("expenseDeleted"));
      });
  };

  useEffect(() => {
    if (token) {
      fetchExpenses();
    }
    window.addEventListener("expenseAdded", fetchExpenses);
    window.addEventListener("expenseDeleted", fetchExpenses);
    return () => {
      window.removeEventListener("expenseAdded", fetchExpenses);
      window.removeEventListener("expenseDeleted", fetchExpenses);
    };
  }, [token]);

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      <div className="flex bg-green-300 py-2 px-4 rounded-lg font-semibold w-fit">
        <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
      </div>

      <AnimatePresence>
        {expenses.map((expense) => (
          <motion.div
            key={expense.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 border border-green-400 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between">
              <p className="font-semibold text-green-700">
                {expense.description}
              </p>
              <Trash2
                className="h-6 w-6 text-red-500 cursor-pointer"
                onClick={() => {
                  setSelectedExpense(expense);
                  setIsModalOpen(true);
                }}
              />
            </div>
            <p className="text-green-600">
              Amount: ₹{expense.amount.toFixed(2)}
            </p>
            <p className="text-green-500">Category: {expense.category.name}</p>
            <p className="text-green-500 text-sm">
              {new Date(expense.date).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-green-100 border-green-400">
          <DialogHeader>
            <DialogTitle className="text-green-700">
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <p className="text-green-600">
            Are you sure you want to delete{" "}
            <strong>{selectedExpense?.description}</strong>? This action cannot
            be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="text-green-700 outline-none hover:bg-green-200"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedExpense) {
                  deleteExpense(selectedExpense.id);
                  setIsModalOpen(false);
                }
              }}
              className=" outline-none  bg-white hover:bg-green-200  text-red-600"
            >
              <Trash /> Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
