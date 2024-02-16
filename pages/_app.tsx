import '@/styles/globals.css'
import  '@/styles/resume.css';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session = {pageProps.session}>
      <Toaster />
      <Component {...pageProps} />
    </SessionProvider>
  )

}
