import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 text-center">
      <div>
        <div className="data-num text-xs uppercase tracking-widest text-ink-2">404 · no matching tone</div>
        <h1 className="mt-4 font-display text-6xl lowercase leading-none">off-key.</h1>
        <p className="mt-4 text-ink-2">The page you are looking for does not exist.</p>
        <Link href="/" className="pill-solid tap mt-7">Go home</Link>
      </div>
    </main>
  );
}
