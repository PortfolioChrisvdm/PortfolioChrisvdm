import { PageHeader } from "../components/ui/PageHeader";

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
      <PageHeader
        eyebrow="ResolveIQ workspace"
        title={title}
        description={description}
      />
    </section>
  );
};