"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function ExportButton() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("");
  const { token } = useAuth();

  const handleExport = () => {
    if (!token) return;
    
    let url = "/api/export";
    const params = new URLSearchParams();

    if (startDate && endDate) {
      params.append("startDate", startDate);
      params.append("endDate", endDate);
    } else if (month) {
      params.append("month", month);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.style.display = 'none';
    document.body.appendChild(a);
    
    // Fetch the CSV data with authentication
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) throw new Error('Export failed');
      return response.text();
    })
    .then(csv => {
      // Create a blob from the CSV data
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      
      // Set up the download
      a.href = url;
      a.download = 'expenses.csv';
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch(error => {
      console.error('Export error:', error);
      alert('Failed to export data. Please try again.');
    });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-leaf-green">Export Expenses</h3>
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-light-green rounded-lg"
            placeholder="Start Date"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-light-green rounded-lg"
            placeholder="End Date"
          />
        </div>
        
        <div className="text-center text-gray-500">OR</div>
        
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full p-2 border border-light-green rounded-lg"
        />
      </div>

      <Button
        onClick={handleExport}
        className="w-full bg-leaf-green hover:bg-forest-green text-white"
      >
        <Download className="mr-2 h-4 w-4" />
        Export to CSV
      </Button>
    </div>
  );
} 