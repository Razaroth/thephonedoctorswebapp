"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

const LOCATIONS = [
  "Oklahoma City",
  "Edmond",
  "71st and Memorial (Tulsa)",
  "E. 41st St. (Tulsa)",
  "Broken Arrow",
  "Owasso",
  "Jenks",
  "Bixby",
  "Fayetteville (AR)",
  "Fort Smith (AR)"
];

export default function EmployeeSettings() {
  const [homeStore, setHomeStore] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("https://thephonedoctorswebapp-server.onrender.com/api/employee/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setHomeStore(data.homeStore || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("https://thephonedoctorswebapp-server.onrender.com/api/employee/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ homeStore }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Home store updated successfully.");
      } else {
        setError(data.error || "Failed to update home store.");
      }
    } catch {
      setError("Failed to update home store.");
    }
  };

  return (
    <div className="max-w-full sm:max-w-xl mx-auto mt-6 sm:mt-10 bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-4 mb-4 sm:mb-6">
        <Logo size={56} />
        <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">Settings</h1>
      </div>
      <button
        className="mb-4 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-primary font-semibold flex items-center gap-2"
        onClick={() => window.history.back()}
      >
        <span>&larr;</span>
        <span>Back</span>
      </button>
      <select
        value={homeStore}
        onChange={e => setHomeStore(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      >
        <option value="">Select your home store</option>
        {LOCATIONS.map(loc => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
        {success && <div className="text-green-600 font-semibold">{success}</div>}
        {error && <div className="text-red-600 font-semibold">{error}</div>}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition"
        >Save Changes</button>
      </form>
  );
}
