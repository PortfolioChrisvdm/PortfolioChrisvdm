import Layout from '@/components/Layout';
import Section from '@/components/Section';
import GalleryLightbox from '@/components/GalleryLightbox';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function Guesthouse(){
const imgs = ['/images/guesthouse/1.jpg','/images/guesthouse/2.jpg','/images/guesthouse/3.jpg'];
return (
<Layout>
<Section title="The Guesthouse" lead="Eight elegant rooms, tranquil pool, and wildlife roaming the grounds.">
<div className="grid md:grid-cols-2 gap-8">
<div>
<p className="text-neutral-700">Each room includes premium bedding, ensuite bathrooms, coffee stations and garden or pool views. Ideal for wedding parties, safari hunters and travelling couples.</p>
<ul className="list-disc pl-5 mt-4 space-y-1 text-neutral-700">
<li>8 rooms (double/twin)</li>
<li>Swimming pool & lounge deck</li>
<li>Breakfast on request</li>
<li>Wildlife viewing from the lawns</li>
</ul>
</div>
<div>
<GalleryLightbox images={imgs} />
</div>
</div>
</Section>
</Layout>
);
}


export async function getStaticProps({ locale }){
return { props: { ...(await serverSideTranslations(locale, ['common'])) } };
}