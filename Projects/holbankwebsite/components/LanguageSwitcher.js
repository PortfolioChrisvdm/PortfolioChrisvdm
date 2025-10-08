import { useRouter } from 'next/router';


export default function LanguageSwitcher(){
const router = useRouter();
const { pathname, asPath, query, locale } = router;
const locales = [
{ code:'en', label:'EN' },
{ code:'de', label:'DE' },
{ code:'ru', label:'RU' }
];


const switchTo = (code) => {
router.push({ pathname, query }, asPath, { locale: code });
};


return (
<div className="flex gap-2">
{locales.map(l => (
<button key={l.code} onClick={() => switchTo(l.code)}
className={`px-3 py-1 rounded-full border text-sm ${locale===l.code?'bg-neutral-900 text-white':'hover:bg-neutral-100'}`}>{l.label}</button>
))}
</div>
);
}