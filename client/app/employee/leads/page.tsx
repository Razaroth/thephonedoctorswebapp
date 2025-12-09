

"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

type Quote = {
	id: string;
	user?: { name?: string; email?: string; phone?: string };
	device?: string;
	issue?: string;
	details?: string;
	status: string;
	createdAt: string;
	assignedTo?: string;
};

type Employee = {
	id: string;
	name: string;
	email: string;
};

export default function EmployeeLeadsPage() {
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [deviceFilter, setDeviceFilter] = useState("");
	const [dateFilter, setDateFilter] = useState("");
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [editState, setEditState] = useState<{ [id: string]: { status: string; assignedTo: string } }>({});

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) return;
		// Fetch all quotes
		fetch("https://thephonedoctorswebapp-server.onrender.com/api/quotes", {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(res => res.json())
			.then(data => setQuotes(Array.isArray(data) ? data : []));
		// Fetch all employees
		fetch("https://thephonedoctorswebapp-server.onrender.com/api/employees", {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(res => res.json())
			.then(data => setEmployees(Array.isArray(data) ? data : []));
	}, []);

	const filteredQuotes = quotes.filter(q => {
		const matchesSearch =
			(q.user?.name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
			(q.device?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
			(q.issue?.toLowerCase().includes(search.toLowerCase()) ?? false);
		const matchesStatus = statusFilter ? q.status === statusFilter : true;
		const matchesDevice = deviceFilter ? q.device === deviceFilter : true;
		const matchesDate = dateFilter ? q.createdAt?.startsWith(dateFilter) : true;
		return matchesSearch && matchesStatus && matchesDevice && matchesDate;
	});

	useEffect(() => {
		if (quotes.length > 0) {
			const initialState: { [id: string]: { status: string; assignedTo: string } } = {};
			quotes.forEach(q => {
				initialState[q.id] = { status: q.status, assignedTo: q.assignedTo || "" };
			});
			setEditState(initialState);
		}
  }, [quotes]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-white via-red-50 to-black/10 pb-12">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 pt-8">
        <div className="flex flex-col items-center mb-8">
          <Logo size={180} className="mb-4 drop-shadow-lg" />
          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-black via-red-600 to-primary bg-clip-text text-transparent mb-2 tracking-tight flex items-center gap-2">
            <span className="inline-block align-middle">Employee Leads</span>
            <span className="inline-block align-middle text-red-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 013-3.87M6 8v4m0 0V8m0 4h12m-6 4v4m0 0V16m0 4h6m-6 0H3" /></svg></span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">Manage, assign, and update repair leads</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-6 items-start sm:items-center bg-white/80 p-4 rounded-xl shadow-lg border border-primary/30">
          <input
            type="text"
            placeholder="🔍 Search by customer/device/issue"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-primary p-2 rounded focus:border-primary focus:ring-2 focus:ring-primary/20 w-full sm:w-48 bg-white shadow-sm"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border border-primary p-2 rounded focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white shadow-sm"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={deviceFilter}
            onChange={e => setDeviceFilter(e.target.value)}
            className="border border-primary p-2 rounded focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white shadow-sm"
          >
            <option value="">All Devices</option>
            <option value="phone">Phone</option>
            <option value="computer">Computer</option>
            <option value="tablet">Tablet</option>
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="border border-primary p-2 rounded focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white shadow-sm"
          />
        </div>
        {error && <div className="text-red-500 mb-2 font-semibold">{error}</div>}
        {filteredQuotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 013-3.87M9 17h6M3 17h5v-2a4 4 0 013-3.87M6 8v4m0 0V8m0 4h12m-6 4v4m0 0V16m0 4h6m-6 0H3" /></svg>
            <p className="text-center text-gray-500 text-lg">No quote requests found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto mt-2 w-full">
            <table className="min-w-[700px] sm:w-full border shadow-xl rounded-2xl overflow-hidden text-xs sm:text-sm bg-white/90">
              <thead>
                <tr className="bg-gradient-to-r from-primary/10 via-red-100 to-white">
                  <th className="p-3 border-b text-black font-bold whitespace-nowrap">Customer</th>
                  <th className="p-3 border-b text-black font-bold whitespace-nowrap">Email</th>
                  <th className="p-3 border-b text-black font-bold whitespace-nowrap min-w-[160px]">Phone</th>
                  <th className="p-3 border-b text-black font-bold whitespace-nowrap">Device</th>
                  <th className="p-3 border-b text-black font-bold whitespace-nowrap">Issue</th>
                  <th className="p-3 border-b text-black font-bold whitespace-nowrap">Details</th>
                  <th className="p-3 border-b text-black font-bold whitespace-nowrap">Status</th>
                  <th className="p-3 border-b text-black font-bold whitespace-nowrap">Date</th>
                  <th className="p-3 border-b text-black font-bold whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map(q => (
                  <tr key={q.id} className="hover:bg-primary/10 transition-all duration-200">
                    <td className="p-3 border-b align-top">
                      <span className="font-semibold text-primary flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {q.user?.name || "-"}
                      </span>
                    </td>
                    <td className="p-3 border-b align-top">{q.user?.email || "-"}</td>
                    <td className="p-3 border-b align-top min-w-[160px] break-all">{q.user?.phone || "-"}</td>
                    <td className="p-3 border-b align-top">{q.device}</td>
                    <td className="p-3 border-b align-top">{q.issue}</td>
                    <td className="p-3 border-b align-top">{q.details}</td>
                    <td className="p-3 border-b align-top">
                      <span className={`px-2 py-1 rounded text-xs font-bold shadow ${q.status === 'pending' ? 'bg-gray-200 text-black' : q.status === 'reviewed' ? 'bg-primary text-white' : 'bg-green-600 text-white'}`}>{q.status}</span>
                    </td>
                    <td className="p-3 border-b align-top">{new Date(q.createdAt).toLocaleString()}</td>
                    <td className="p-3 border-b align-top min-w-[200px]">
                      <select
                        value={editState[q.id]?.status || ""}
                        onChange={e => setEditState(es => ({ ...es, [q.id]: { ...es[q.id], status: e.target.value } }))}
                        className="border border-primary rounded p-1 mb-1 w-full bg-white shadow-sm"
                      >
                        <option value="pending">pending</option>
                        <option value="reviewed">reviewed</option>
                        <option value="completed">completed</option>
                      </select>
                      <div className="mt-1">
                        <select
                          value={editState[q.id]?.assignedTo || ""}
                          onChange={e => setEditState(es => ({ ...es, [q.id]: { ...es[q.id], assignedTo: e.target.value } }))}
                          className="border border-primary rounded p-1 w-full bg-white shadow-sm"
                        >
                          <option value="">Unassigned</option>
                          {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                              {emp.name} ({emp.email})
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        className="mt-2 w-full bg-gradient-to-r from-primary via-red-600 to-black text-white rounded px-2 py-1 text-xs font-semibold shadow hover:scale-[1.03] transition"
                        onClick={async () => {
                          const token = localStorage.getItem("token");
                          if (!token) return;
                          const res = await fetch(`https://thephonedoctorswebapp-server.onrender.com/api/quotes/${q.id}`, {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                              status: editState[q.id]?.status,
                              assignedTo: editState[q.id]?.assignedTo,
                            }),
                          });
                          if (res.ok) {
                            const updated = await res.json();
                            setQuotes(quotes =>
                              quotes.map(quote => (quote.id === updated.id ? updated : quote))
                            );
                          } else {
                            const data = await res.json();
                            setError(data.error || "Failed to update lead");
                          }
                        }}
                      >
                        <span className="inline-flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Save</span>
                      </button>
                      <button
                        className="mt-2 w-full bg-gradient-to-r from-gray-600 via-primary to-black text-white rounded px-2 py-1 text-xs font-semibold shadow hover:scale-[1.03] transition"
                        onClick={async () => {
                          const token = localStorage.getItem("token");
                          if (!token) return;
                          const res = await fetch(`https://thephonedoctorswebapp-server.onrender.com/api/quotes/${q.id}`, {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ status: "archived" }),
                          });
                          if (res.ok) {
                            const updated = await res.json();
                            setQuotes(quotes => quotes.filter(quote => quote.id !== updated.id));
                          } else {
                            const data = await res.json();
                            setError(data.error || "Failed to archive lead");
                          }
                        }}
                      >
                        <span className="inline-flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>Archive</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-center w-full mt-10">
          <button
            className="px-8 py-3 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-xl hover:bg-gray-200 text-black font-bold flex items-center gap-2 text-lg border border-primary shadow-lg hover:scale-[1.03] transition"
            onClick={() => window.history.back()}
          >
            <span className="text-2xl">&larr;</span>
            <span className="ml-2">Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}