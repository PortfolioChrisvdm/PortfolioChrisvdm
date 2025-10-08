import Layout from '@/components/Layout';


export default function NotFound(){
return (
<Layout>
<div className="section">
<div className="container text-center">
<h1 className="h1">404</h1>
<p className="lead">Page not found.</p>
<a href="/" className="btn-primary mt-6 inline-block">Back home</a>
</div>
</div>
</Layout>
);
}