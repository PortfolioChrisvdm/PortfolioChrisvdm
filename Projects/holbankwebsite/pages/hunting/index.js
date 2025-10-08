import Layout from '@/components/Layout';
import Section from '@/components/Section';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function Hunting(){
return (
<Layout>
<Section title="Hunting Safaris" lead="In partnership with Lloyd Safaris. Hunters overnight at Holbank River Lodge before and after trips.">
<p className="text-neutral-700">We provide comfortable accommodation, secure gear storage and flexible meal options for hunters. Transfers to the safari operator can be arranged on request.</p>
<div className="mt-6">
<a className="btn-primary" href="https://www.lloyd-safaris.co.za/" target="_blank" rel="noreferrer">Visit Lloyd Safaris</a>
</div>
</Section>
</Layout>
);
}


export async function getStaticProps({ locale }){
return { props: { ...(await serverSideTranslations(locale, ['common'])) } };
}