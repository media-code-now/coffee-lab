interface SeoHeadProps {
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export default function SeoHead({ jsonLd }: SeoHeadProps) {
  if (!jsonLd) {
    return null;
  }

  const payload = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  return payload.map((node, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
    />
  ));
}
