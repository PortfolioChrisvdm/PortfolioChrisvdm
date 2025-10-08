import Layout from '@/components/Layout';
import Section from '@/components/Section';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function Contact(){
const [status, setStatus] = useState('');
const submit = async (e) => {
e.preventDefault();
const data = Object.fromEntries(new FormData(e.currentTarget));
const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)});
setStatus(res.ok ? 'Thank you — we will be in touch.' : 'Something went wrong, please try again.');
};
return (
<Layout>
<Section title="Enquire or Book a Viewing" lead="Tell us about your wedding, stay or safari dates and we’ll get back to you within 24 hours.">
<form onSubmit={submit} className="card p-6 grid md:grid-cols-2 gap-4">
<input className="border rounded-xl p-3" name="name" placeholder="Full name" required />
<input className="border rounded-xl p-3" name="email" type="email" placeholder="Email" required />
<input className="border rounded-xl p-3 md:col-span-2" name="phone" placeholder="Phone / WhatsApp" />
<select className="border rounded-xl p-3" name="interest" defaultValue="Weddings">
<option>Weddings</option>
<option>Guesthouse</option>
<option>Hunting Safaris</option>
<option>Fishing</option>
</select>
<input className="border rounded-xl p-3" name="dates" placeholder="Preferred dates" />
<textarea className="border rounded-xl p-3 md:col-span-2" name="message" rows="5" placeholder="Tell us a little more (guest count, ceremony preference, etc.)"></textarea>
<button className="btn-primary md:col-span-2" type="submit">Send Enquiry</button>
{status && <div className="md:col-span-2 text-sm text-green-700">{status}</div>}
</form>
</Section>
</Layout>
);
}


export async function getStaticProps({ locale }){
return { props: { ...(await serverSideTranslations(locale, ['common'])) } };
}