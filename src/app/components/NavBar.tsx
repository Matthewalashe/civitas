import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-md border border-slate-200 bg-white">
            {/* change to /logo.svg if yours is svg */}
            <Image src="/logo.png" alt="Civitas" fill className="object-contain p-1" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Civitas
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link className="hover:text-slate-900" href="/can-i-build-here">
            Can I Build Here?
          </Link>
          <Link className="hover:text-slate-900" href="/methodology">
            Methodology
          </Link>
        </nav>
      </div>
    </header>
  );
}
