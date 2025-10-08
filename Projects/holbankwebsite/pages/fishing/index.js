import Layout from '@/components/Layout';
import Section from '@/components/Section';
import GalleryLightbox from '@/components/GalleryLightbox';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function Fishing(){
const imgs = ['/images/fishing/1.jpg','/images/fishing/2.jpg','/images/fishing/3.jpg'];
return (
<Layout>
<Section title="Fishing & Lakes" lead="Small lakes and the Holbank River attract casual anglers and nature lovers.">
<div className="grid md:grid-cols-2 gap-8">
<div>
<ul className="list-disc pl-5 space-y-1 text-neutral-700">
<li>Scenic lakeside spots and river banks</li>
<li>Ideal for photo sessions at golden hour</li>
<li>Ask us about local angling guides</li>
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