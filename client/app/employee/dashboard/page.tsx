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
      fetch("https://thephonedoctorswebapp-server.onrender.com/api/employee/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setProfile(data))
        .catch(() => setProfile(null));
      fetch("https://thephonedoctorswebapp-server.onrender.com/api/employee/stats", {
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
    <div className="max-w-full sm:max-w-2xl mx-auto mt-6 sm:mt-10 bg-gradient-to-br from-white via-gray-50 to-red-50 p-8 rounded-2xl shadow-2xl border border-gray-100 animate-fade-in text-center">
      <div className="flex flex-col items-center w-full mt-8 mb-8 text-center">
        <Logo size={240} className="mb-8 mx-auto block drop-shadow-lg animate-fade-in" />
        <h1 className="text-4xl font-extrabold text-center mb-6 text-primary tracking-tight drop-shadow-lg flex items-center justify-center gap-2">
          <span className="material-icons text-red-500">person</span>
          {profile && profile.name ? `${profile.name}'s Dashboard` : "Employee Dashboard"}
        </h1>
      </div>
      <div className="mb-6 text-center">
        <span className="text-lg sm:text-xl font-semibold text-gray-700">
          Welcome{profile && profile.name ? ", " : ""}
          <span className="text-primary">{profile && profile.name ? profile.name : "Employee"}</span>
        </span>
      </div>
      <nav className="flex flex-wrap gap-4 mb-8 items-center justify-center">
        <a href="/employee/dashboard" className="flex items-center gap-1 text-primary font-semibold px-4 py-2 rounded-lg bg-white shadow hover:bg-red-100 transition-all">
          <span className="material-icons text-red-500">home</span> Dashboard Home
        </a>
        <a href="/employee/leads" className="flex items-center gap-1 text-primary font-semibold px-4 py-2 rounded-lg bg-white shadow hover:bg-red-100 transition-all">
          <span className="material-icons text-red-500">assignment</span> View Leads
        </a>
      </nav>
      <div className="mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center flex items-center gap-2">
          <span className="material-icons text-red-500">link</span> Quick Links
        </h2>
        <ul className="space-y-2">
          <li>
            <a href="/employee/profile" className="flex items-center gap-2 text-primary hover:bg-red-50 font-medium px-3 py-2 rounded-lg transition-all">
              <span className="material-icons text-red-400">person</span> Profile
            </a>
          </li>
          <li>
            <a href="/employee/settings" className="flex items-center gap-2 text-primary hover:bg-red-50 font-medium px-3 py-2 rounded-lg transition-all">
              <span className="material-icons text-red-400">settings</span> Settings
            </a>
          </li>
        </ul>
      </div>
      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-500 via-red-400 to-red-600 rounded-xl p-8 text-center shadow-xl text-white hover:scale-105 transition-transform">
            <div className="text-5xl font-extrabold flex items-center justify-center gap-2">
              <span className="material-icons">assignment</span>{stats.open}
            </div>
            <div className="mt-2 text-lg font-semibold">Open Requests</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 via-green-400 to-green-600 rounded-xl p-8 text-center shadow-xl text-white hover:scale-105 transition-transform">
            <div className="text-5xl font-extrabold flex items-center justify-center gap-2">
              <span className="material-icons">check_circle</span>{stats.completed}
            </div>
            <div className="mt-2 text-lg font-semibold">Completed</div>
          </div>
          <div className="bg-gradient-to-br from-gray-100 via-white to-gray-300 rounded-xl p-8 text-center shadow-xl text-black hover:scale-105 transition-transform">
            <div className="text-5xl font-extrabold flex items-center justify-center gap-2">
              <span className="material-icons">person</span>{stats.assigned}
            </div>
            <div className="mt-2 text-lg font-semibold">Assigned to You</div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500">No stats available.</div>
      )}
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
