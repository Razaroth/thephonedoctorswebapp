"use client";
import Logo from "@/components/Logo";

export default function EmployeeSettings() {
  return (
    <div className="max-w-full sm:max-w-xl mx-auto mt-6 sm:mt-10 bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-4 mb-4 sm:mb-6">
        <Logo size={56} />
        <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">Settings</h1>
      </div>
      <div className="text-gray-700">Settings management coming soon.</div>
    </div>
  );
}
