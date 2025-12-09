"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

export default function EmployeeProfile() {
  const [profile, setProfile] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://localhost:5000/api/employee/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setProfile({ name: data.name || "", email: data.email || "", password: "" });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    const token = localStorage.getItem("token");
    if (!token) return;
    const body: any = { name: profile.name, email: profile.email };
    if (profile.password) body.password = profile.password;
    try {
      const res = await fetch("http://localhost:5000/api/employee/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Profile updated successfully.");
        setProfile({ name: data.name, email: data.email, password: "" });
      } else {
        setError(data.error || "Failed to update profile.");
      }
    } catch {
      setError("Failed to update profile.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-full sm:max-w-xl mx-auto mt-6 sm:mt-10 bg-gradient-to-br from-white via-gray-50 to-red-50 p-8 rounded-2xl shadow-2xl border border-gray-100 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Logo size={56} />
        <h1 className="text-3xl font-extrabold text-primary tracking-tight drop-shadow-lg flex items-center gap-2">
          <span className="material-icons text-red-500">person</span> Profile
        </h1>
      </div>
      <form className="space-y-7" onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          <span className="material-icons text-red-400">badge</span>
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
        </div>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          required
        />
        <div className="flex items-center gap-3">
          <span className="material-icons text-red-400">email</span>
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
        </div>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          required
        />
        <div className="flex items-center gap-3">
          <span className="material-icons text-red-400">lock</span>
          <label className="block text-gray-700 font-semibold mb-1">Password <span className="text-gray-400 font-normal">(leave blank to keep current)</span></label>
        </div>
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          autoComplete="new-password"
        />
        {success && <div className="text-green-600 font-semibold animate-fade-in">{success}</div>}
        {error && <div className="text-red-600 font-semibold animate-fade-in">{error}</div>}
        <button
          type="submit"
          className="w-full text-white bg-red-600 font-semibold hover:bg-red-700 px-5 py-3 rounded-xl shadow transition-all mt-2"
        >Save Changes</button>
        <button
          type="button"
          className="w-full mt-4 px-5 py-3 bg-gray-100 rounded-xl hover:bg-red-100 text-primary font-semibold flex items-center gap-2 shadow transition-all"
          onClick={() => window.location.href = '/employee/dashboard'}
        >
          <span className="material-icons">arrow_back</span>
          <span>Back to Dashboard</span>
        </button>
      </form>
    </div>
  );
}
