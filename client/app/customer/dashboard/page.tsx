"use client";
import React, { useEffect, useState } from "react";

export default function CustomerDashboard() {
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        setLoyaltyPoints(data.loyaltyPoints || 0);
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch loyalty points");
        setLoading(false);
      });
  }, [router]);

  return (
    <div className="max-w-full sm:max-w-2xl mx-auto mt-6 sm:mt-10 p-4 sm:p-8 rounded-2xl shadow-2xl border border-gray-100 animate-fade-in text-center">
      <div className="flex flex-col items-center w-full mt-8 mb-6 text-center">
        <img src="/icons/icon-512x512.png" alt="Logo" className="mb-8 mx-auto block drop-shadow-lg animate-fade-in" style={{ width: 240, height: 240 }} />
        <h1 className="text-4xl font-extrabold text-center mb-6 text-primary tracking-tight drop-shadow-lg">
          {profile && profile.name ? `${profile.name}'s Dashboard` : "Customer Dashboard"}
        </h1>
      </div>
      <div className="mb-6 text-center">
        <span className="text-lg sm:text-xl font-semibold text-gray-700">
          Welcome{profile && profile.name ? ", " : ""}
          <span className="text-primary">{profile && profile.name ? profile.name : "Customer"}</span>
        </span>
      </div>
      <nav className="flex flex-wrap gap-4 mb-8 items-center justify-center">
        <a href="/customer/dashboard" className="text-primary font-semibold px-4 py-2 rounded-lg bg-white shadow hover:bg-red-100 transition-all">Dashboard Home</a>
        <a href="/quote" className="text-primary font-semibold px-4 py-2 rounded-lg bg-white shadow hover:bg-red-100 transition-all">Request a Quote</a>
        <a href="/customer/loyalty" className="text-primary font-semibold px-4 py-2 rounded-lg bg-white shadow hover:bg-red-100 transition-all">Loyalty Points</a>
      </nav>
      <div className="mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Quick Links</h2>
        <ul className="space-y-2">
          <li>
            <a href="/customer/profile" className="text-primary hover:bg-red-50 font-medium px-3 py-2 rounded-lg transition-all">Profile</a>
          </li>
          <li>
            <a href="/customer/quotes" className="text-primary hover:bg-red-50 font-medium px-3 py-2 rounded-lg transition-all">My Quotes</a>
          </li>
          <li>
            <a href="/customer/settings" className="text-primary hover:bg-red-50 font-medium px-3 py-2 rounded-lg transition-all">Settings</a>
          </li>
        </ul>
      </div>
      {/* Loyalty points box removed as requested */}
      {error && <div className="text-red-500 mt-2 text-center animate-fade-in">{error}</div>}
      <div className="mt-8 flex justify-center">
        <button
          className="w-full sm:w-auto text-white bg-red-600 font-semibold hover:bg-red-700 px-5 py-3 rounded-xl shadow transition-all"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/auth/login");
          }}
        >Logout</button>
      </div>
    </div>
  );
}
