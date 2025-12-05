"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuotePage() {
  const [device, setDevice] = useState("");
  const [issue, setIssue] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    const res = await fetch("http://localhost:5000/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ device, issue, details, phone, email, location }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Quote request submitted! We will contact you soon.");
      setDevice("");
      setIssue("");
      setDetails("");
      setPhone("");
      setEmail("");
      setLocation("");
    } else {
      setError(data.error || "Failed to submit quote request");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-2 sm:px-0">
      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-8 rounded shadow-md w-full max-w-xs sm:max-w-md">
        <h2 className="text-xl sm:text-2xl mb-3 sm:mb-4 font-bold text-center">Request a Quote</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-2 sm:mb-3 p-2 border rounded"
          required
        />
        <select
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="w-full mb-2 sm:mb-3 p-2 border rounded"
          required
        >
          <option value="">Which Phone Doctors location would you like to go to?</option>
          <option value="Downtown">Downtown</option>
          <option value="Eastside">Eastside</option>
          <option value="Westside">Westside</option>
          <option value="Northside">Northside</option>
          <option value="Southside">Southside</option>
        </select>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full mb-2 sm:mb-3 p-2 border rounded"
          required
        />
        <select
          value={device}
          onChange={e => setDevice(e.target.value)}
          className="w-full mb-2 sm:mb-3 p-2 border rounded"
          required
        >
          <option value="">Select Device</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
          <option value="tablet">Tablet</option>
          <option value="game console">Game Console</option>
        </select>
        <input
          type="text"
          placeholder="Make and Model of Device"
          value={issue}
          onChange={e => setIssue(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Please explain the issue"
          value={details}
          onChange={e => setDetails(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          rows={4}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}
