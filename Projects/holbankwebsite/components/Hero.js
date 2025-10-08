import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';


export default function Hero(){
const { t } = useTranslation('common');
return (
<section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
<Image src="/images/hero.jpg" alt="Holbank River Lodge" fill priority className="object-cover" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
<div className="absolute bottom-16 left-0 right-0">
<div className="container">
<motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
className="h1 text-white max-w-3xl">{t('hero.title')}</motion.h1>
<div className="mt-6 flex gap-4">
<a href="/contact" className="btn-primary">{t('hero.ctaPrimary')}</a>
<a href="/weddings" className="btn-outline text-white border-white">
{t('hero.ctaSecondary')}</a>
</div>
</div>
</div>
</section>
);
}