"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

type Lead = {
  id: string;
  device: string;
  issue: string;
  details: string;
  status: string;
  createdAt: string;
};

export default function CustomerLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("https://thephonedoctorswebapp-server.onrender.com/api/my-quotes", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setLeads(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load leads.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-full sm:max-w-2xl mx-auto mt-8 bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="flex flex-col items-center w-full mb-6">
        <Logo size={120} className="mb-4 mx-auto block" />
        <h1 className="text-2xl font-bold text-center mb-4 text-primary tracking-tight">My Repair Leads</h1>
        <a
          href="/customer/dashboard"
          className="mt-2 text-primary underline text-base font-semibold hover:text-red-600 transition"
        >
          View Loyalty Points
        </a>
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : leads.length === 0 ? (
        <div className="text-center text-gray-500">No leads found.</div>
      ) : (
        <div className="overflow-x-auto mt-4 w-full">
          <table className="min-w-[700px] sm:w-full border shadow-lg rounded-lg overflow-hidden text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Device</th>
                <th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Issue</th>
                <th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Details</th>
                <th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Status</th>
                <th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="hover:bg-primary/10 transition">
                  <td className="p-3 border align-top">{lead.device}</td>
                  <td className="p-3 border align-top">{lead.issue}</td>
                  <td className="p-3 border align-top">{lead.details}</td>
                  <td className="p-3 border align-top">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${lead.status === 'pending' ? 'bg-gray-200 text-black' : lead.status === 'reviewed' ? 'bg-primary text-white' : 'bg-green-600 text-white'}`}>{lead.status}</span>
                  </td>
                  <td className="p-3 border align-top">{new Date(lead.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
