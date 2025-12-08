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
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-white via-red-50 to-black/10 pb-12">
      <div className="w-full max-w-xl mx-auto px-2 sm:px-6 pt-10">
        <div className="bg-white/90 rounded-2xl shadow-2xl border border-primary/30 p-8 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <Logo size={72} className="drop-shadow-lg" />
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-black via-red-600 to-primary bg-clip-text text-transparent tracking-tight flex items-center gap-2">
              <span>Settings</span>
              <span className="inline-block align-middle text-red-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 0V8m0 4h12m-6 4v4m0 0V16m0 4h6m-6 0H3" /></svg></span>
            </h1>
          </div>
          <button
            className="mb-6 px-6 py-2 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-xl hover:bg-gray-200 text-black font-bold flex items-center gap-2 text-lg border border-primary shadow-lg hover:scale-[1.03] transition"
            onClick={() => window.history.back()}
          >
            <span className="text-2xl">&larr;</span>
            <span className="ml-2">Back</span>
          </button>
          <form className="space-y-6 w-full" onSubmit={handleSave}>
            <div className="flex flex-col gap-2">
              <label htmlFor="homeStore" className="font-semibold text-primary text-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10v6a1 1 0 001 1h3m10-7h3a1 1 0 011 1v6a1 1 0 01-1 1h-3m-10 0h10" /></svg>
                Home Store
              </label>
              <select
                id="homeStore"
                value={homeStore}
                onChange={e => setHomeStore(e.target.value)}
                className="w-full border border-primary rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white shadow-sm text-lg"
                required
              >
                <option value="">Select your home store</option>
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            {success && <div className="text-green-600 font-semibold text-center">{success}</div>}
            {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
            <button
              type="submit"
              className="bg-gradient-to-r from-primary via-red-600 to-black text-white px-8 py-3 rounded-xl font-bold hover:scale-[1.03] transition shadow-lg text-lg flex items-center gap-2 mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
