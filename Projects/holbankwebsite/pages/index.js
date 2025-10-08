import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import VenueHighlights from '@/components/VenueHighlights';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function Home(){
return (
<Layout>
<Hero />
<Section title="A riverside destination">
<p className="lead">Holbank River Lodge combines a romantic wedding setting with an elegant guesthouse, small lakes for anglers, a tranquil pool, and roaming wildlife.</p>
</Section>
<Section title="Explore Holbank">
<VenueHighlights />
</Section>
<Section title="What our guests say">
<Testimonials />
</Section>
<Section>
<CTA />
</Section>
</Layout>
);
}


export async function getStaticProps({ locale }){
return { props: { ...(await serverSideTranslations(locale, ['common'])) } };
}