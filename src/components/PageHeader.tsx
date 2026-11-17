import { Breadcrumbs } from "@/components/Breadcrumbs";

export function PageHeader({
  title,
  description,
  updated,
  breadcrumb,
}: {
  title: string;
  description?: string;
  updated?: string;
  breadcrumb: string;
}) {
  return (
    <section className="border-b border-slate-200/70 bg-gradient-to-b from-brand-50/70 to-slate-50">
      <div className="mx-auto max-w-7xl px-4 pb-9 pt-6 sm:px-6">
        <Breadcrumbs items={[{ label: breadcrumb }]} />
        <div className="max-w-3xl">
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
          {description && <p className="mt-3 text-pretty text-base leading-relaxed text-slate-600">{description}</p>}
          {updated && <p className="mt-3 text-xs font-medium text-slate-400">{updated}</p>}
        </div>
      </div>
    </section>
  );
}
