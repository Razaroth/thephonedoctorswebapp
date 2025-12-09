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
        My Quote Requests
      </h1>
      {quotes.length === 0 ? (
        <div className="text-gray-600 text-center">No quote requests found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border mb-2 text-xs sm:text-base rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-red-100 via-white to-red-50">
                <th className="p-3 border font-semibold text-red-600">Device</th>
                <th className="p-3 border font-semibold text-red-600">Issue</th>
                <th className="p-3 border font-semibold text-red-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(q => (
                <tr key={q._id} className="hover:bg-red-50 transition-all">
                  <td className="p-3 border whitespace-nowrap">{q.device}</td>
                  <td className="p-3 border whitespace-nowrap">{q.issue}</td>
                  <td className="p-3 border whitespace-nowrap">{new Date(q.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-3 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-xl hover:bg-gray-200 text-black font-bold flex items-center gap-2 text-lg border border-primary shadow-lg hover:scale-[1.03] transition"
          onClick={() => router.push('/customer/dashboard')}
        >
          <span className="text-2xl">&larr;</span>
          <span className="ml-2">Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
}
