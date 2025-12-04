import Image from "next/image";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-10 px-4 bg-white sm:py-20 sm:px-8 md:px-16 md:py-32 sm:items-start">
        <Image
          className="mb-6 w-24 h-auto sm:w-28"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-4 text-center w-full sm:items-start sm:text-left sm:gap-6">
          <h1 className="w-full max-w-xs text-2xl sm:text-3xl font-semibold leading-8 sm:leading-10 tracking-tight text-black">
            To get started, edit the page.tsx file.
          </h1>
          <p className="w-full max-w-md text-base sm:text-lg leading-7 sm:leading-8 text-zinc-600">
            Looking for a starting point or more instructions? Head over to{' '}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 underline"
            >
              Templates
            </a>{' '}
            or the{' '}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 underline"
            >
              Learning
            </a>{' '}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full text-base font-medium sm:flex-row sm:gap-4">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 sm:px-5 text-background transition-colors hover:bg-[#383838] sm:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className=""
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-4 sm:px-5 transition-colors hover:border-transparent hover:bg-gray-100 sm:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
