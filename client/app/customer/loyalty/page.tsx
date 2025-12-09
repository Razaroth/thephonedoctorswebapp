"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TIERS = [
  { name: "Bronze", min: 0, max: 99, discount: "0%" },
  { name: "Silver", min: 100, max: 249, discount: "5%" },
  { name: "Gold", min: 250, max: 499, discount: "10%" },
  { name: "Platinum", min: 500, max: Infinity, discount: "15%" },
];

export default function LoyaltyPointsPage() {
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
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
        setLoyaltyPoints(data.loyaltyPoints || 0);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch loyalty points");
        setLoading(false);
      });
  }, [router]);

  const currentTier = TIERS.find(t => loyaltyPoints >= t.min && loyaltyPoints <= t.max);

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gradient-to-br from-white via-gray-50 to-red-50 p-8 rounded-2xl shadow-2xl border border-gray-100 animate-fade-in">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-primary tracking-tight drop-shadow-lg">Loyalty Points</h1>
      <div className="flex flex-col items-center mb-8">
        <div className="text-5xl font-extrabold text-red-600">{loading ? "Loading..." : loyaltyPoints}</div>
        <div className="mt-2 text-lg font-semibold text-gray-700">Loyalty Points</div>
        {currentTier && (
          <div className="mt-2 text-base font-bold text-primary">Current Tier: {currentTier.name} ({currentTier.discount} discount)</div>
        )}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Loyalty Tiers & Rewards</h2>
        <table className="w-full border mb-2 text-sm rounded-xl overflow-hidden shadow-lg bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-red-100 via-white to-red-50">
              <th className="p-3 border font-semibold text-red-600">Tier</th>
              <th className="p-3 border font-semibold text-red-600">Points Range</th>
              <th className="p-3 border font-semibold text-red-600">Discount</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map(tier => (
              <tr key={tier.name} className={currentTier?.name === tier.name ? "bg-red-50 font-bold" : ""}>
                <td className="p-3 border text-center">{tier.name}</td>
                <td className="p-3 border text-center">{tier.min} - {tier.max === Infinity ? "∞" : tier.max}</td>
                <td className="p-3 border text-center">{tier.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-gray-700 text-center">Earn points with every repair. The more points you have, the higher your tier and the bigger your discount on future repairs!</p>
      </div>
      <div className="flex justify-center mt-8">
          <button
            className="px-6 py-3 bg-gradient-to-r from-gray-100 via-white to-gray-200 rounded-xl hover:bg-gray-200 text-black font-bold text-lg border border-primary shadow-lg hover:scale-[1.03] transition"
            onClick={() => router.push('/customer/dashboard')}
          >
            ← Back to Dashboard
          </button>
      </div>
    </div>
  );
}
