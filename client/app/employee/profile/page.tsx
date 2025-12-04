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
    <div className="max-w-full sm:max-w-xl mx-auto mt-6 sm:mt-10 bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-4 mb-4 sm:mb-6">
        <Logo size={56} />
        <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">Profile</h1>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Password <span className="text-gray-400 font-normal">(leave blank to keep current)</span></label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            autoComplete="new-password"
          />
        </div>
        {success && <div className="text-green-600 font-semibold">{success}</div>}
        {error && <div className="text-red-600 font-semibold">{error}</div>}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
