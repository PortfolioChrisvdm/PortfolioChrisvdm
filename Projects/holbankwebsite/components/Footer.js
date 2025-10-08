import { useTranslation } from 'next-i18next';


export default function Footer(){
const { t } = useTranslation('common');
return (
<footer className="border-t bg-neutral-50">
<div className="container py-10 grid md:grid-cols-3 gap-8 text-sm">
<div>
<div className="font-semibold mb-2">{t('brand')}</div>
<p>Holbank, South Africa • <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="underline">View map</a></p>
</div>
<div>
<div className="font-semibold mb-2">Contact</div>
<p>WhatsApp: +27 XX XXX XXXX<br/>Email: bookings@holbankriverlodge.com</p>
</div>
<div>
<div className="font-semibold mb-2">Social</div>
<p><a className="underline" href="#">Instagram</a> • <a className="underline" href="#">Facebook</a></p>
</div>
</div>
<div className="container py-6 text-xs text-neutral-500">© {new Date().getFullYear()} {t('brand')}. {t('footer.rights')}</div>
</footer>
);
}