import Image from "next/image";

export default function Logo({ className = "", size = 480 }: { className?: string; size?: number }) {
  return (
    <Image
      src="https://thephonedoctors.com/images/LOGO2.png"
      alt="Phone Doctors Logo"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
