import { useState } from 'react';


export default function GalleryLightbox({ images=[] }){
const [active, setActive] = useState(null);
return (
<div>
<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
{images.map((src, i) => (
<button key={i} onClick={()=>setActive(src)} className="aspect-[4/3] overflow-hidden rounded-xl">
<img src={src} alt="Gallery" className="w-full h-full object-cover" />
</button>
))}
</div>
{active && (
<div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={()=>setActive(null)}>
<img src={active} alt="" className="max-h-[85vh] rounded-xl" />
</div>
)}
</div>
);
}