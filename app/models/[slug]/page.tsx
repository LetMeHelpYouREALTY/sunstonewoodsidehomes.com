import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getModelBySlug, models, type ModelSlug } from '@/lib/models'
import { CONTACT_EMAIL } from '@/lib/site'
import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbList } from '@/lib/structured-data'

type ModelPageProps = {
  params: Promise<{ slug: ModelSlug }>
}

export async function generateStaticParams() {
  return models.map((model) => ({ slug: model.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const model = getModelBySlug(slug)

  if (!model) {
    return {
      title: 'Plan not found',
    }
  }

  return {
    title: `${model.name} | Capella at Sunstone`,
    description: model.description,
  }
}

export default async function ModelDetailPage({ params }: ModelPageProps) {
  const { slug } = await params
  const model = getModelBySlug(slug)

  if (!model) {
    notFound()
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16">
      <JsonLd
        id={`schema-breadcrumb-${model.slug}`}
        data={buildBreadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Floor Plans', path: '/models' },
          { name: model.name, path: `/models/${model.slug}` },
        ])}
      />
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          {model.name}
        </p>
        <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
          {model.headline}
        </h1>
        <p className="text-lg text-muted-foreground">{model.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span>{model.priceFrom}</span>
          <span className="text-border">|</span>
          <span>{model.size}</span>
          <span className="text-border">|</span>
          <span>{model.beds}</span>
          <span className="text-border">|</span>
          <span>{model.baths}</span>
          <span className="text-border">|</span>
          <span>{model.garage}</span>
        </div>
      </header>

      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground">Design story</h2>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            {model.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            Outdoor living: <span className="font-semibold text-foreground">{model.outdoor}</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(model.name)}%20Tour%20Request`}
              className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Schedule a model tour
            </a>
            <Link
              href="/models"
              className="inline-flex items-center rounded-full border border-input px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Compare other plans
            </Link>
          </div>
        </article>
        <aside className="space-y-6 rounded-3xl border border-dashed border-border/70 bg-background/60 p-6 text-sm text-muted-foreground">
          <h3 className="text-base font-semibold text-foreground">
            Imagine your finishes
          </h3>
          <p>
            Replace this section with your own image gallery or design studio selections once
            assets are available. For now, use it as a placeholder to note flooring, cabinetry,
            appliance, and lighting choices that resonate with your household.
          </p>
          <p>
            Lifestyle fit: capture how your daily routines align with this plan—working from
            home, entertaining, multi-gen living, or simplifying maintenance.
          </p>
          <div className="border-t border-border/60 pt-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-primary">
              Next step
            </h4>
            <p className="mt-2">
              Email{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(model.name)}%20Design%20Packet`}
                className="font-semibold text-foreground transition hover:text-primary"
              >
                {CONTACT_EMAIL}
              </a>{' '}
              to request neighborhood releases, estimated build timelines, and incentive
              stacking guidance for this plan.
            </p>
          </div>
          {model.brochureUrl && (
            <a
              href={model.brochureUrl}
              className="inline-flex items-center font-semibold text-primary transition hover:text-primary/80"
            >
              Request digital brochure &rsaquo;
            </a>
          )}
        </aside>
      </section>

      <section className="rounded-3xl border border-border bg-background/70 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-foreground">Is this the right fit?</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Consider these lifestyle prompts as you evaluate floor plan alignment. Dr. Duffy can
          facilitate side-by-side comparisons and provide cost breakdowns for structural
          upgrades.
        </p>
        <ul className="mt-6 grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
          {model.lifestyle.map((item) => (
            <li key={item} className="rounded-2xl border border-border/70 p-4">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

