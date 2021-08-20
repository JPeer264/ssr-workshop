import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { useState } from 'react';
import Head from 'next/head';
import Header from '../app/components/Header';
import Container from '../app/components/Container';
import GlobalStyles from '../app/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet" />
          <title>SSR app</title>
        </Head>
        <GlobalStyles />
        <Header />
        <Container>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Container>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
