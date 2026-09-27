type JsonLdProps = {
  id?: string
  data: Record<string, unknown> | Record<string, unknown>[]
}

/** Server-rendered JSON-LD for crawlers and answer engines (not next/script). */
export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
