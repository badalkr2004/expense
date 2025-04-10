"use client";

import { useEffect, useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import CategoryForm from "@/components/CategoryForm";
import ExportButton from "@/components/ExportButton";
import AuthProvider, { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

function UserProfile() {
  const { user, logout } = useAuth();
  
  return (
    <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <User className="w-6 h-6 text-leaf-green mr-2" />
        <div>
          <p className="font-semibold text-forest-green">{user?.name || 'User'}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>
      <Button 
        variant="outline" 
        className="border-red-400 text-red-500 hover:bg-red-50"
        onClick={logout}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}

function ExpenseTrackerContent() {
  const { user, token, isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isLoading || !isClient) {
    return <div className="flex justify-center items-center h-[60vh]">Loading...</div>;
  }

  if (!user || !token) {
    return null; // AuthProvider will redirect to login
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-b from-light-green to-cream">
      <h1 className="text-4xl font-bold mb-8 text-forest-green text-center">Green Expense Tracker</h1>
      
      <UserProfile />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-leaf-green">Add Expense</h2>
            <ExpenseForm />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-leaf-green">Add Category</h2>
            <CategoryForm />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ExportButton />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-leaf-green">Expenses</h2>
          <ExpenseList />
        </div>
      </div>
    </div>
  );
}

export default function ExpenseTrackerApp() {
  return (
    <AuthProvider>
      <ExpenseTrackerContent />
    </AuthProvider>
  );
} 