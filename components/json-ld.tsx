/**
 * Structured data. JSON.stringify output is injected as-is; the `<` escape
 * guards against a stray "</script>" inside any string value.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
