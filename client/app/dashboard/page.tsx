"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    // Decode token to get user info (role, name, etc.)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
      if (payload.role === "customer") {
        fetch("http://localhost:5000/api/my-quotes", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data)) setQuotes(data.slice(0, 3)); // Show up to 3 recent
            else setError(data.error || "Failed to fetch requests");
          })
          .catch(() => setError("Failed to fetch requests"));
      }
    } catch {
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
    setLoading(false);
  }, [router]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-full sm:max-w-2xl mx-auto mt-6 sm:mt-10 bg-white p-4 sm:p-8 rounded shadow">
      <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Welcome, {user.role === "employee" ? "Employee" : "Customer"}!</h1>
      {user.role === "customer" ? (
        <div>
          <p className="mb-2">You can request a repair quote or check your repair status here.</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3 sm:mb-4">
            <a href="/quote" className="text-blue-600 underline">Request a Quote</a>
          </div>
          <h2 className="text-base sm:text-lg font-semibold mb-2">Recent Requests</h2>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {quotes.length === 0 ? (
            <p className="text-gray-600">No recent requests.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border mb-2 text-xs sm:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Device</th>
                  <th className="p-2 border">Issue</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map(q => (
                  <tr key={q._id}>
                    <td className="p-2 border whitespace-nowrap">{q.device}</td>
                    <td className="p-2 border whitespace-nowrap">{q.issue}</td>
                    <td className="p-2 border whitespace-nowrap">{q.status}</td>
                    <td className="p-2 border whitespace-nowrap">{new Date(q.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="mb-2">View and manage leads and repairs below.</p>
          <div className="flex flex-col gap-2 mb-4">
            <a href="/employee/dashboard" className="text-blue-600 underline font-semibold">Dashboard Home</a>
            <a href="/employee/leads" className="text-blue-600 underline font-semibold">View Leads</a>
            <a href="/employee/profile" className="text-blue-600 underline font-semibold">Profile</a>
            <a href="/employee/settings" className="text-blue-600 underline font-semibold">Settings</a>
          </div>
        </div>
      )}
    </div>
  );
}
