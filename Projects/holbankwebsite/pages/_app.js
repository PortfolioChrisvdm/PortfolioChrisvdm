import '@/styles/globals.css';
import { DefaultSeo } from 'next-seo';
import { appWithTranslation } from 'next-i18next';
import defaultSEO from '@/seo/default';


function MyApp({ Component, pageProps }) {
return (
<>
<DefaultSeo {...defaultSEO} />
<Component {...pageProps} />
</>
);
}


export default appWithTranslation(MyApp);