export default function Card({ title, text, href }){
return (
<a href={href} className="card p-6 hover:shadow-md transition block">
<div className="text-xl font-semibold">{title}</div>
{text && <p className="text-neutral-600 mt-2">{text}</p>}
</a>
);
}