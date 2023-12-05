import Container from '@/components/Container';
import { persistedStore, store } from '@/redux/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <Container>
            <div className='w-fit mx-auto'>Loading...</div>
          </Container>
        }
        persistor={persistedStore}
      >
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
