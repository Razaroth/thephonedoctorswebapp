
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-primary flex flex-col items-center justify-center font-sans">
      <main className="w-full max-w-3xl mx-auto flex flex-col items-center px-4 py-8 sm:py-16">
        <div className="mb-8 flex flex-col items-center">
          <span className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-glow mb-2 tracking-tight">Phone Doctors</span>
          <span className="text-lg sm:text-2xl text-primary font-semibold uppercase tracking-widest">Futuristic Tech Repair</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 w-full">
          <div className="bg-gradient-to-br from-primary/80 to-black/80 rounded-xl shadow-lg p-4 flex flex-col items-center">
            <Image src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" width={320} height={180} alt="Tech Repair 1" className="rounded-lg mb-3 shadow-lg" />
            <span className="text-white text-xl font-bold mb-1">Phone & Tablet Repair</span>
            <p className="text-zinc-300 text-sm text-center">Screens, batteries, charging ports, water damage, and more.</p>
          </div>
          <div className="bg-gradient-to-br from-primary/80 to-black/80 rounded-xl shadow-lg p-4 flex flex-col items-center">
            <Image src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" width={320} height={180} alt="Tech Repair 2" className="rounded-lg mb-3 shadow-lg" />
            <span className="text-white text-xl font-bold mb-1">Computer & Laptop Repair</span>
            <p className="text-zinc-300 text-sm text-center">Hardware upgrades, virus removal, data recovery, and more.</p>
          </div>
          <div className="bg-gradient-to-br from-primary/80 to-black/80 rounded-xl shadow-lg p-4 flex flex-col items-center">
            <Image src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" width={320} height={180} alt="Tech Repair 3" className="rounded-lg mb-3 shadow-lg" />
            <span className="text-white text-xl font-bold mb-1">Free Diagnostics</span>
            <p className="text-zinc-300 text-sm text-center">No fix, no fee. Get a quote before any work begins.</p>
          </div>
          <div className="bg-gradient-to-br from-primary/80 to-black/80 rounded-xl shadow-lg p-4 flex flex-col items-center">
            <Image src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80" width={320} height={180} alt="Tech Repair 4" className="rounded-lg mb-3 shadow-lg" />
            <span className="text-white text-xl font-bold mb-1">Fast Turnaround</span>
            <p className="text-zinc-300 text-sm text-center">Most repairs completed same day or next day.</p>
          </div>
        </div>
        <section className="w-full bg-black/80 rounded-xl shadow-xl p-6 mb-8 border border-primary">
          <h2 className="text-2xl font-bold text-primary mb-4 text-center">Why Choose Us?</h2>
          <ul className="list-disc pl-5 text-zinc-200 text-base">
            <li>Experienced, certified technicians</li>
            <li>Transparent pricing and honest advice</li>
            <li>Warranty on all repairs</li>
            <li>Multiple convenient locations</li>
          </ul>
        </section>
        <section className="w-full bg-black/80 rounded-xl shadow-xl p-6 mb-8 border border-primary">
          <h2 className="text-xl font-bold text-primary mb-2 text-center">Contact & Locations</h2>
          <div className="text-zinc-200 text-base text-center">
            <p>Email: <a href="mailto:info@thephonedoctors.com" className="text-primary font-semibold">info@thephonedoctors.com</a></p>
            <p>Phone: <a href="tel:555-123-4567" className="text-primary font-semibold">555-123-4567</a></p>
            <p className="mt-2">Visit us at Downtown, Eastside, Westside, Northside, or Southside locations!</p>
          </div>
        </section>
        <a href="/quote" className="w-full sm:w-auto mt-4 px-6 py-3 rounded-full bg-primary text-white font-bold text-lg text-center shadow-lg hover:bg-red-700 transition">Request a Quote</a>
      </main>
    </div>
  );
}
