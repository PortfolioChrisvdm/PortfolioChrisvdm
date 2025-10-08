import { Html, Head, Main, NextScript } from 'next/document';


export default function Document() {
return (
<Html lang="en">
<Head>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<link rel="icon" href="/favicon.ico" />
</Head>
<body className="font-[Inter]">
<Main />
<NextScript />
</body>
</Html>
);
}