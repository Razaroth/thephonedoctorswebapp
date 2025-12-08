

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
		   <div className="flex flex-col items-center justify-center min-h-screen">
			   <div className="flex flex-col items-center w-full mt-8">
				   <Logo size={480} className="mb-8 mx-auto block" />
				   <h1 className="text-3xl font-bold text-center mb-6">Employee Leads Dashboard</h1>
			   </div>
			<div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-4 items-start sm:items-center bg-white p-3 sm:p-4 rounded shadow border border-gray-200 w-full">
				<input
					type="text"
					placeholder="Search by customer/device/issue"
					value={search}
					onChange={e => setSearch(e.target.value)}
					className="border border-primary p-2 rounded focus:border-primary focus:ring-2 focus:ring-primary/20 w-full sm:w-48"
				/>
				<select
					value={statusFilter}
					onChange={e => setStatusFilter(e.target.value)}
					className="border border-primary p-2 rounded focus:border-primary focus:ring-2 focus:ring-primary/20"
				>
					<option value="">All Statuses</option>
					<option value="pending">Pending</option>
					<option value="reviewed">Reviewed</option>
					<option value="completed">Completed</option>
				</select>
				<select
					value={deviceFilter}
					onChange={e => setDeviceFilter(e.target.value)}
					className="border border-primary p-2 rounded focus:border-primary focus:ring-2 focus:ring-primary/20"
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
					className="border border-primary p-2 rounded focus:border-primary focus:ring-2 focus:ring-primary/20"
				/>
			</div>
			{error && <div className="text-red-500 mb-2">{error}</div>}
			   {filteredQuotes.length === 0 ? (
				   <p className="text-center text-gray-500 mt-8">No quote requests found.</p>
			   ) : (
				   <>
					   <div className="overflow-x-auto mt-4 w-full">
						   <table className="min-w-[700px] sm:w-full border shadow-lg rounded-lg overflow-hidden text-xs sm:text-sm">
						<thead>
							<tr>
								<th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Customer</th>
								<th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Email</th>
								<th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Phone</th>
								<th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Device</th>
								<th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Issue</th>
								<th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Details</th>
								<th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Status</th>
								<th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Date</th>
								<th className="p-2 sm:p-3 border bg-white text-black whitespace-nowrap">Action</th>
							</tr>
						</thead>
						<tbody>
							{filteredQuotes.map(q => (
								<tr key={q.id} className="hover:bg-primary/10 transition">
									<td className="p-3 border align-top">
										<span className="font-semibold text-primary">{q.user?.name || "-"}</span>
									</td>
									<td className="p-3 border align-top">{q.user?.email || "-"}</td>
									<td className="p-3 border align-top">{q.user?.phone || "-"}</td>
									<td className="p-3 border align-top">{q.device}</td>
									<td className="p-3 border align-top">{q.issue}</td>
									<td className="p-3 border align-top">{q.details}</td>
									<td className="p-3 border align-top">
										<span className={`px-2 py-1 rounded text-xs font-bold ${q.status === 'pending' ? 'bg-gray-200 text-black' : q.status === 'reviewed' ? 'bg-primary text-white' : 'bg-green-600 text-white'}`}>{q.status}</span>
									</td>
									<td className="p-3 border align-top">{new Date(q.createdAt).toLocaleString()}</td>
									  <td className="p-3 border align-top min-w-[200px]">
										<select
											value={editState[q.id]?.status || ""}
											onChange={e => setEditState(es => ({ ...es, [q.id]: { ...es[q.id], status: e.target.value } }))}
											className="border border-primary rounded p-1 mb-1 w-full"
										>
											<option value="pending">pending</option>
											<option value="reviewed">reviewed</option>
											<option value="completed">completed</option>
										</select>
										<div className="mt-1">
											<select
												value={editState[q.id]?.assignedTo || ""}
												onChange={e => setEditState(es => ({ ...es, [q.id]: { ...es[q.id], assignedTo: e.target.value } }))}
												className="border border-primary rounded p-1 w-full"
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
											className="mt-2 w-full bg-primary text-white rounded px-2 py-1 text-xs font-semibold"
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
										>Save Changes</button>
										<button
											className="mt-2 w-full bg-red-600 text-white rounded px-2 py-1 text-xs font-semibold"
											onClick={async () => {
												const token = localStorage.getItem("token");
												if (!token) return;
												const res = await fetch(`https://thephonedoctorswebapp-server.onrender.com/api/quotes/${q.id}`, {
													method: "DELETE",
													headers: {
														Authorization: `Bearer ${token}`,
													},
												});
												if (res.ok) {
													setQuotes(quotes => quotes.filter(quote => quote.id !== q.id));
												} else {
													const data = await res.json();
													setError(data.error || "Failed to delete lead");
												}
											}}
										>Delete</button>
									</td>
								</tr>
							))}
						</tbody>
						   </table>
					   </div>
					   <div className="flex justify-center w-full mt-8">
						   <button
							   className="px-6 py-3 bg-gray-100 rounded hover:bg-gray-200 text-primary font-semibold"
							   onClick={() => window.history.back()}
						   >
							   ← Back
						   </button>
					   </div>
				   </>
			   )}
		</div>
	);
}
