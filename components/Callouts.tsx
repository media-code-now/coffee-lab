interface CalloutProps {
  heading: string;
  body: string;
  actionLabel?: string;
  actionHref?: string;
}

export function Callout({ heading, body, actionLabel, actionHref }: CalloutProps) {
  return (
    <section className="callout">
      <h3>{heading}</h3>
      <p>{body}</p>
      {actionLabel && actionHref ? (
        <a className="callout__button" href={actionHref}>
          {actionLabel}
        </a>
      ) : null}
    </section>
  );
}

export function InlineCallout({ heading, body }: CalloutProps) {
  return (
    <aside className="inline-callout">
      <strong>{heading}</strong>
      <p>{body}</p>
    </aside>
  );
}
