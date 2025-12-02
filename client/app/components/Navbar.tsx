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
    <nav className="bg-blue-700 text-white px-4 py-3 flex gap-4 items-center">
      <span className="font-bold text-lg">Phone Doctors</span>
      <div className="flex gap-4 ml-6">
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
