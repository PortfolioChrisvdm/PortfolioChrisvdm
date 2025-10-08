export default function Section({ id, title, lead, children }){
return (
<section id={id} className="section">
<div className="container">
{title && <h2 className="h2 mb-3">{title}</h2>}
{lead && <p className="lead mb-10 max-w-2xl">{lead}</p>}
{children}
</div>
</section>
);
}