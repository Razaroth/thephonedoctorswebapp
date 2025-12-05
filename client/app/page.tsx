
import Image from "next/image";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
      <main className="w-full max-w-3xl mx-auto flex flex-col items-center px-4 py-8 sm:py-16">
        <div className="mb-8 flex flex-col items-center">
          <Logo size={420} className="mb-10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 w-full">
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center border border-zinc-200">
            <Image src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80" width={320} height={180} alt="Smartphone" className="rounded-lg mb-3 shadow-lg" />
            <span className="text-black text-xl font-bold mb-1">Phone & Tablet Repair</span>
            <p className="text-zinc-600 text-sm text-center">Screens, batteries, charging ports, water damage, and more.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center border border-zinc-200">
            <Image src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" width={320} height={180} alt="Computer Repair" className="rounded-lg mb-3 shadow-lg" />
            <span className="text-black text-xl font-bold mb-1">Computer & Laptop Repair</span>
            <p className="text-zinc-600 text-sm text-center">Hardware upgrades, virus removal, data recovery, and more.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center border border-zinc-200">
            <Image src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" width={320} height={180} alt="Human technician working on phone" className="rounded-lg mb-3 shadow-lg" />
            <span className="text-black text-xl font-bold mb-1">Quick Diagnostics</span>
            <p className="text-zinc-600 text-sm text-center">We provide fast diagnostics, get a quote before any work begins</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center border border-zinc-200">
            <Image src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80" width={320} height={180} alt="Fast Turnaround" className="rounded-lg mb-3 shadow-lg" />
            <span className="text-black text-xl font-bold mb-1">Fast Turnaround</span>
            <p className="text-zinc-600 text-sm text-center">Most repairs completed same day or next day.</p>
          </div>
        </div>
        <section className="w-full bg-white rounded-xl shadow-xl p-6 mb-8 border border-zinc-200">
          <h2 className="text-2xl font-bold text-primary mb-4 text-center">Why Choose Us?</h2>
          <ul className="list-disc pl-5 text-zinc-700 text-base">
            <li>Experienced, certified technicians</li>
            <li>Transparent pricing and honest advice</li>
            <li>Warranty on all repairs</li>
            <li>Multiple convenient locations</li>
          </ul>
        </section>
        <section className="w-full bg-white rounded-xl shadow-xl p-6 mb-8 border border-zinc-200">
          <h2 className="text-xl font-bold text-primary mb-2 text-center">Contact & Locations</h2>
          <div className="text-zinc-700 text-base text-center">
            <p>Email: <a href="mailto:okc@thephonedoctors.com" className="text-primary font-semibold">okc@thephonedoctors.com</a></p>
            <p>Phone: <a href="tel:405-849-9204" className="text-primary font-semibold">405-849-9204</a></p>
            <p className="mt-2">Visit us in OKC, Edmond, Tulsa and Arkansas!</p>
          </div>
        </section>
        <a href="/quote" className="w-full sm:w-auto mt-4 px-6 py-3 rounded-full bg-primary text-white font-bold text-lg text-center shadow-lg hover:bg-red-700 transition">Request a Quote</a>
      </main>
    </div>
  );
}
