import React from "react";

export default function CustomerDashboard() {
  // TODO: Fetch and display loyalty points from backend
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Loyalty Points</h2>
        <div className="text-2xl font-bold text-primary mb-2">0</div>
        <p className="text-gray-600">Earn points every time you repair a device with us!</p>
      </section>
      {/* ...other dashboard sections... */}
    </div>
  );
}
