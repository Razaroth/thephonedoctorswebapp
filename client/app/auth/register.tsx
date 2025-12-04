"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => router.push("/auth/login"), 1500);
    } else {
      setError(data.error || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 font-bold text-center">Register</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
        <p className="mt-4 text-center text-sm">
          Already have an account? <a href="/auth/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}
