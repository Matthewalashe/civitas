export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-slate-600">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-medium text-slate-900">Civitas</div>
          <div className="text-xs">
            © {new Date().getFullYear()} Civitas. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
