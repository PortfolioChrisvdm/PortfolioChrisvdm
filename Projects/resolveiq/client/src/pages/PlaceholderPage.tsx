interface PlaceholderPageProps {
  title: string;
  description: string;
}

export const PlaceholderPage = ({
  title,
  description,
}: PlaceholderPageProps) => {
  return (
    <section className="page-section" aria-labelledby="page-title">
      <p className="page-eyebrow">ResolveIQ workspace</p>
      <h1 id="page-title">{title}</h1>
      <p className="page-description">{description}</p>
    </section>
  );
};