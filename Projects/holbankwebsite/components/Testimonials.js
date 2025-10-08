export default function Testimonials(){
const items = [
{ quote:"The most magical riverside wedding — unforgettable!", name:"Emma & Daniel (UK)" },
{ quote:"Perfect base for our hunting trip. Great rooms & hospitality.", name:"Michael (DE)" }
];
return (
<div className="grid md:grid-cols-2 gap-6">
{items.map((t,i)=> (
<div key={i} className="card p-6">
<p className="italic">“{t.quote}”</p>
<div className="mt-3 text-sm text-neutral-600">— {t.name}</div>
</div>
))}
</div>
);
}