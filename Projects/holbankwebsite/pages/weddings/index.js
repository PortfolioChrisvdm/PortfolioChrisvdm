import Layout from '@/components/Layout';
import Section from '@/components/Section';
import GalleryLightbox from '@/components/GalleryLightbox';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function Weddings(){
const imgs = ['/images/weddings/1.jpg','/images/weddings/2.jpg','/images/weddings/3.jpg'];
return (
<Layout>
<Section title="Weddings at Holbank" lead="Exclusive-use venue with indoor & outdoor ceremony options and breathtaking riverside sunsets.">
<div className="grid md:grid-cols-2 gap-8">
<div>
<h3 className="text-xl font-semibold mb-2">Why Choose Us</h3>
<ul className="list-disc pl-5 space-y-1 text-neutral-700">
<li>Exclusive-use policy — one wedding per day</li>
<li>Ceremony: garden, deck, or lodge hall</li>
<li>Reception: up to 120 guests, dance floor & bar</li>
<li>Photo spots: river, lakes, wildlife, golden sunsets</li>
<li>In-house catering (buffet/plated/spit braai) + tastings</li>
</ul>
<div className="mt-6 flex gap-3">
<a className="btn-primary" href="/contact">Request a quote</a>
<a className="btn-outline" href="/contact">Book a viewing</a>
</div>
</div>
<div>
<GalleryLightbox images={imgs} />
</div>
</div>
</Section>
<Section title="Packages & Pricing" lead="Transparent inclusions with seasonal and midweek options.">
<div className="grid md:grid-cols-3 gap-6">
{[{name:'Classic',price:'R45 000',items:['Venue hire','Tables & chairs','Basic décor','Setup & breakdown']},{name:'Signature',price:'R65 000',items:['All Classic','Premium décor lighting','Harvest table','On-the-day coordinator']},{name:'Bespoke',price:'POA',items:['Custom layout','Preferred suppliers','Menu tasting','Coordinator']}].map(p => (
<div key={p.name} className="card p-6">
<div className="text-xl font-semibold">{p.name}</div>
<div className="text-3xl mt-1">{p.price}</div>
<ul className="mt-4 space-y-1 text-neutral-700 list-disc pl-5">
{p.items.map(i => <li key={i}>{i}</li>)}
</ul>
</div>
))}
</div>
</Section>
</Layout>
);
}


export async function getStaticProps({ locale }){
return { props: { ...(await serverSideTranslations(locale, ['common'])) } };
}