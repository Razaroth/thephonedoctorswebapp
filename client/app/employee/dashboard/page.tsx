"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";

export default function EmployeeDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "employee") {
        router.push("/dashboard");
        return;
      }
      setUser(payload);
      // Fetch employee profile for name
      fetch("http://localhost:5000/api/employee/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setProfile(data))
        .catch(() => setProfile(null));
      fetch("http://localhost:5000/api/employee/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setStats(data))
        .finally(() => setLoading(false));
    } catch {
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
  }, [router]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-4 mb-2 justify-between">
        <div className="flex items-center gap-4">
          <Logo size={120} />
          <h1 className="text-3xl font-bold text-primary tracking-tight">Employee Dashboard</h1>
        </div>
        <button
          className="text-red-600 font-semibold hover:underline px-4 py-2 border border-red-200 rounded transition"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/auth/login");
          }}
        >Logout</button>
      </div>
      <div className="mb-6 ml-[132px]">
        <span className="text-lg font-semibold text-gray-700">
          Welcome{profile && profile.name ? ", " : ""}
          <span className="text-primary">{profile && profile.name ? profile.name : "Employee"}</span>
        </span>
      </div>
      <nav className="flex flex-wrap gap-4 mb-8 items-center">
        <a href="/employee/dashboard" className="text-primary font-semibold hover:underline">Dashboard Home</a>
        <a href="/employee/leads" className="text-primary font-semibold hover:underline">View Leads</a>
      </nav>

      {/* Additional dashboard links section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-2">Quick Links</h2>
        <ul className="space-y-2">
          <li>
            <a href="/employee/profile" className="block text-primary hover:underline font-medium">Profile</a>
          </li>
          <li>
            <a href="/employee/settings" className="block text-primary hover:underline font-medium">Settings</a>
          </li>
        </ul>
      </div>

      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-primary rounded-lg p-6 text-center shadow text-white">
            <div className="text-4xl font-bold">{stats.open}</div>
            <div className="mt-2 text-lg">Open Requests</div>
          </div>
          <div className="bg-green-600 rounded-lg p-6 text-center shadow text-white">
            <div className="text-4xl font-bold">{stats.completed}</div>
            <div className="mt-2 text-lg">Completed</div>
          </div>
          <div className="bg-black rounded-lg p-6 text-center shadow text-white">
            <div className="text-4xl font-bold">{stats.assigned}</div>
            <div className="mt-2 text-lg">Assigned to You</div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500">No stats available.</div>
      )}
    </div>
  );
}
