import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useApollo } from '../src/lib/apolloClient';
import { ApolloProvider } from '@apollo/client';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
