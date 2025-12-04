"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [showLocations, setShowLocations] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
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

  const handleFindNearest = () => {
    setShowLocations(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Logo size={480} className="mb-6" />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 font-bold text-center">Customer Registration</h2>
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
        <button
          type="button"
          className="w-full mt-4 bg-primary text-white p-2 rounded font-bold hover:bg-red-700"
          onClick={handleFindNearest}
        >Find Nearest Phone Doctors</button>
      </form>
      {showLocations && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-red-600 font-bold text-xl"
              onClick={() => setShowLocations(false)}
            >×</button>
            <h3 className="text-lg font-bold mb-2">Nearest Phone Doctors</h3>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold">Phone Doctors - Oklahoma City</span><br />
                1001 West Memorial Rd.<br />
                Oklahoma City, OK 73114<br />
                (405) 849-9204
              </li>
              <li>
                <span className="font-semibold">Phone Doctors - Edmond</span><br />
                1173 E 2nd St<br />
                Edmond, OK 73034<br />
                (405) 531-0075
              </li>
              <li>
                <span className="font-semibold">Phone Doctors - Tulsa (71st and Memorial)</span><br />
                8210 E 71st St<br />
                Tulsa, OK 74133<br />
                (918) 921-5306
              </li>
            </ul>
            <p className="mt-4 text-gray-600 text-sm">For more locations, visit <a href="https://thephonedoctors.com/about.html" target="_blank" className="text-primary underline">thephonedoctors.com/about.html</a></p>
          </div>
        </div>
      )}
    </div>
  );
}
