
export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
      <main className="w-full max-w-2xl mx-auto flex flex-col items-center px-4 py-8 sm:py-16">
        <div className="mb-6 flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight mb-2">Phone Doctors</span>
          <span className="text-lg sm:text-xl text-zinc-700 font-medium">Your trusted device repair experts</span>
        </div>
        <section className="w-full bg-white rounded-xl shadow p-4 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4 text-center">Our Services</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="bg-red-50 border-l-4 border-primary p-4 rounded">
              <span className="font-semibold text-black">Phone & Tablet Repair</span>
              <p className="text-zinc-600 text-sm mt-2">Screen, battery, charging port, water damage, and more.</p>
            </li>
            <li className="bg-red-50 border-l-4 border-primary p-4 rounded">
              <span className="font-semibold text-black">Computer & Laptop Repair</span>
              <p className="text-zinc-600 text-sm mt-2">Hardware upgrades, virus removal, data recovery, and more.</p>
            </li>
            <li className="bg-red-50 border-l-4 border-primary p-4 rounded">
              <span className="font-semibold text-black">Free Diagnostics</span>
              <p className="text-zinc-600 text-sm mt-2">No fix, no fee. Get a quote before any work begins.</p>
            </li>
            <li className="bg-red-50 border-l-4 border-primary p-4 rounded">
              <span className="font-semibold text-black">Fast Turnaround</span>
              <p className="text-zinc-600 text-sm mt-2">Most repairs completed same day or next day.</p>
            </li>
          </ul>
        </section>
        <section className="w-full bg-white rounded-xl shadow p-4 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-primary mb-2 text-center">Why Choose Us?</h2>
          <ul className="list-disc pl-5 text-zinc-700 text-base">
            <li>Experienced, certified technicians</li>
            <li>Transparent pricing and honest advice</li>
            <li>Warranty on all repairs</li>
            <li>Multiple convenient locations</li>
          </ul>
        </section>
        <section className="w-full bg-white rounded-xl shadow p-4 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-primary mb-2 text-center">Contact & Locations</h2>
          <div className="text-zinc-700 text-base text-center">
            <p>Email: <a href="mailto:info@thephonedoctors.com" className="text-primary font-semibold">info@thephonedoctors.com</a></p>
            <p>Phone: <a href="tel:555-123-4567" className="text-primary font-semibold">555-123-4567</a></p>
            <p className="mt-2">Visit us at Downtown, Eastside, Westside, Northside, or Southside locations!</p>
          </div>
        </section>
        <a href="/quote" className="w-full sm:w-auto mt-4 px-6 py-3 rounded-full bg-primary text-white font-bold text-lg text-center shadow hover:bg-red-700 transition">Request a Quote</a>
      </main>
    </div>
  );
}
