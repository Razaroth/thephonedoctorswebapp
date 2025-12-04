"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/auth/login", label: "Login" },
  { href: "/auth/register", label: "Register" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-blue-700 text-white px-2 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
      <span className="font-bold text-base sm:text-lg">Phone Doctors</span>
      <div className="flex gap-2 sm:gap-4 sm:ml-6 w-full sm:w-auto justify-center sm:justify-start">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={
              pathname === link.href
                ? "underline underline-offset-4 font-semibold"
                : "hover:underline"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
