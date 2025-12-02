"use client";
import Logo from "@/components/Logo";

export default function EmployeeSettings() {
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-4 mb-6">
        <Logo size={80} />
        <h1 className="text-2xl font-bold text-primary tracking-tight">Settings</h1>
      </div>
      <div className="text-gray-700">Settings management coming soon.</div>
    </div>
  );
}
