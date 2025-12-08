"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetch("https://thephonedoctorswebapp-server.onrender.com/api/customer/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
        } else {
          setError(data.error || "Failed to fetch profile");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error: Could not reach the server.");
        setLoading(false);
      });
  }, [router]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!profile) return null;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Name:</span> {profile.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {profile.email}
        </div>
        <div>
          <span className="font-semibold">Phone:</span> {profile.phone || "-"}
        </div>
        <div>
          <span className="font-semibold">City:</span> {profile.city || "-"}
        </div>
        <div>
          <span className="font-semibold">State:</span> {profile.state || "-"}
        </div>
        <div>
          <span className="font-semibold">Loyalty Points:</span> {profile.loyaltyPoints || 0}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          className="w-full sm:w-auto text-red-600 font-semibold hover:underline px-3 py-2 border border-red-200 rounded transition"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/auth/login");
          }}
        >Logout</button>
      </div>
    </div>
  );
}
