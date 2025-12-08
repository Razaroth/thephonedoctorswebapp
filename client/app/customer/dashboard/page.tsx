"use client";
import React, { useEffect, useState } from "react";

export default function CustomerDashboard() {
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setError("Not logged in");
    fetch("https://thephonedoctorswebapp-server.onrender.com/api/customer/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setLoyaltyPoints(data.loyaltyPoints || 0);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch loyalty points");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Loyalty Points</h2>
        <div className="text-2xl font-bold text-primary mb-2">
          {loading ? "Loading..." : loyaltyPoints}
        </div>
        <p className="text-gray-600">Earn points every time you repair a device with us!</p>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </section>
      {/* ...other dashboard sections... */}
    </div>
  );
}
