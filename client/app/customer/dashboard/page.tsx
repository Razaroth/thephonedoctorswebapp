"use client";
import React, { useEffect, useState } from "react";

export default function CustomerDashboard() {
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debug, setDebug] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const router = require('next/navigation').useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetch("https://thephonedoctorswebapp-server.onrender.com/api/customer/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async res => {
        const data = await res.json();
        setDebug({ status: res.status, data });
        setLoyaltyPoints(data.loyaltyPoints || 0);
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch loyalty points");
        setDebug({ error: err?.message });
        setLoading(false);
      });
  }, [router]);

  return (
    <div className="max-w-full sm:max-w-2xl mx-auto mt-6 sm:mt-10 bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="flex flex-col items-center w-full mt-8 mb-6">
        {/* Large logo, reuse employee dashboard style */}
        <img src="/icons/icon-512x512.png" alt="Logo" className="mb-8 mx-auto block" style={{ width: 240, height: 240 }} />
        <h1 className="text-3xl font-bold text-center mb-6 text-primary tracking-tight">
          {profile && profile.name ? `${profile.name}'s Dashboard` : "Customer Dashboard"}
        </h1>
      </div>
      <div className="mb-4">
        <span className="text-base sm:text-lg font-semibold text-gray-700">
          Welcome{profile && profile.name ? ", " : ""}
          <span className="text-primary">{profile && profile.name ? profile.name : "Customer"}</span>
        </span>
      </div>
      <nav className="flex flex-wrap gap-4 mb-8 items-center">
        <a href="/customer/dashboard" className="text-primary font-semibold hover:underline">Dashboard Home</a>
        <a href="/quote" className="text-primary font-semibold hover:underline">Request a Quote</a>
        <a href="/customer/dashboard" className="text-primary font-semibold hover:underline">Loyalty Points</a>
      </nav>
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-2">Quick Links</h2>
        <ul className="space-y-2">
          <li>
            <a href="/customer/profile" className="block text-primary hover:underline font-medium">Profile</a>
          </li>
          <li>
            <a href="/customer/settings" className="block text-primary hover:underline font-medium">Settings</a>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-primary rounded-lg p-6 text-center shadow text-white">
          <div className="text-4xl font-bold">{loading ? "Loading..." : loyaltyPoints}</div>
          <div className="mt-2 text-lg">Loyalty Points</div>
          <p className="text-white mt-2">Earn points every time you repair a device with us!</p>
        </div>
        {/* You can add more cards here for other customer stats/features */}
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {/* Debug output removed for clean UI */}
      <div className="mt-8 flex justify-center">
        <button
          className="w-full sm:w-auto text-red-600 font-semibold hover:underline px-3 py-2 border border-red-200 rounded transition"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/auth/login");
          }}
        >Logout</button>
      </div>
    </div>
  );
}
