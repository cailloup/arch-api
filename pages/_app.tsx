import '../styles/base.sass'
import '../styles/fonts.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import 'react-toastify/dist/ReactToastify.css';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
