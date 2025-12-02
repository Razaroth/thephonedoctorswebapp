"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyQuotesPage() {
  const [user, setUser] = useState<any>(null);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "customer") {
        router.push("/dashboard");
        return;
      }
      setUser(payload);
      fetch("http://localhost:5000/api/my-quotes", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setQuotes(data);
          else setError(data.error || "Failed to fetch quotes");
        })
        .catch(() => setError("Failed to fetch quotes"));
    } catch {
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
    setLoading(false);
  }, [router]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Repair/Quote Requests</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {quotes.length === 0 ? (
        <p>You have not submitted any requests yet.</p>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Device</th>
              <th className="p-2 border">Issue</th>
              <th className="p-2 border">Details</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map(q => (
              <tr key={q.id}>
                <td className="p-2 border">{q.device}</td>
                <td className="p-2 border">{q.issue}</td>
                <td className="p-2 border">{q.details}</td>
                <td className="p-2 border">{q.status}</td>
                <td className="p-2 border">{new Date(q.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
