export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6" aria-hidden="true">
      <div className="h-4 w-48 rounded bg-slate-200" />
      <div className="mt-6 h-10 w-2/3 max-w-xl rounded bg-slate-200" />
      <div className="mt-3 h-4 w-full max-w-2xl rounded bg-slate-200" />
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="h-80 rounded-3xl bg-slate-200" />
        <div className="h-80 rounded-3xl bg-slate-200" />
      </div>
    </div>
  );
}
