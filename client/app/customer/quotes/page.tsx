"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerQuotesPage() {
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
    fetch("https://thephonedoctorswebapp-server.onrender.com/api/my-quotes", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async res => {
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setQuotes(data);
        } else {
          setError(data.error || "Failed to fetch quotes");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error: Could not reach the server.");
        setLoading(false);
      });
  }, [router]);

  if (loading) return <div className="p-8">Loading...</div>;

    if (error) {
      return (
        <div className="p-8">
          <div className="text-red-500">{error}</div>
        </div>
      );
    }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gradient-to-br from-white via-gray-50 to-red-50 p-8 rounded-2xl shadow-2xl border border-gray-100 animate-fade-in">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-primary tracking-tight drop-shadow-lg flex items-center justify-center gap-2">
        <span className="material-icons text-red-500">description</span>
        My Quote Requests
      </h1>
      {quotes.length === 0 ? (
        <div className="text-gray-600 text-center">No quote requests found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border mb-2 text-xs sm:text-base rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-red-100 via-white to-red-50">
                <th className="p-3 border font-semibold text-red-600 flex items-center gap-1"><span className="material-icons text-red-400">smartphone</span>Device</th>
                <th className="p-3 border font-semibold text-red-600 flex items-center gap-1"><span className="material-icons text-red-400">report_problem</span>Issue</th>
                <th className="p-3 border font-semibold text-red-600 flex items-center gap-1"><span className="material-icons text-red-400">hourglass_top</span>Status</th>
                <th className="p-3 border font-semibold text-red-600 flex items-center gap-1"><span className="material-icons text-red-400">calendar_today</span>Date</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(q => (
                <tr key={q._id} className="hover:bg-red-50 transition-all">
                  <td className="p-3 border whitespace-nowrap flex items-center gap-2"><span className="material-icons text-red-300">smartphone</span>{q.device}</td>
                  <td className="p-3 border whitespace-nowrap flex items-center gap-2"><span className="material-icons text-red-300">report_problem</span>{q.issue}</td>
                  <td className="p-3 border whitespace-nowrap flex items-center gap-2"><span className="material-icons text-red-300">hourglass_top</span>{q.status}</td>
                  <td className="p-3 border whitespace-nowrap flex items-center gap-2"><span className="material-icons text-red-300">calendar_today</span>{new Date(q.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
