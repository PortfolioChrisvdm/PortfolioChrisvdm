import Card from './Card';


export default function VenueHighlights(){
const items = [
{ title: 'Exclusive Weddings', text: 'Indoor & outdoor ceremony options with riverside sunsets.', href:'/weddings' },
{ title: 'Guesthouse (8 Rooms)', text: 'Elegant rooms with pool access and wildlife on your doorstep.', href:'/guesthouse' },
{ title: 'Hunting Safaris', text: 'Partnered with Lloyd Safaris. Hunters overnight at the lodge.', href:'/hunting' },
{ title: 'Fishing & Lakes', text: 'Small lakes and the Holbank River — perfect for anglers.', href:'/fishing' }
];
return (
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
{items.map(i => <Card key={i.title} {...i} />)}
</div>
);
}