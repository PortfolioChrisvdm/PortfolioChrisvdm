import Link from 'next/link';
import { useRouter } from 'next/router';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'next-i18next';


export default function Header(){
const { t } = useTranslation('common');
const { locale } = useRouter();
return (
<header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
<div className="container flex items-center justify-between py-4">
<Link href="/" className="text-xl font-semibold">{t('brand')}</Link>
<nav className="hidden md:flex gap-6 text-sm">
<Link href="/" locale={locale}>{t('nav.home')}</Link>
<Link href="/weddings" locale={locale}>{t('nav.weddings')}</Link>
<Link href="/guesthouse" locale={locale}>{t('nav.guesthouse')}</Link>
<Link href="/hunting" locale={locale}>{t('nav.hunting')}</Link>
<Link href="/fishing" locale={locale}>{t('nav.fishing')}</Link>
<Link href="/contact" locale={locale} className="btn-primary">{t('nav.contact')}</Link>
</nav>
<div className="flex items-center gap-3">
<LanguageSwitcher />
</div>
</div>
</header>
);
}