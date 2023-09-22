import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';
import { GlobalModalProvider } from './context/GlobalModalContext.tsx';
import store from './redux/config/configStore.ts';
import { theme } from './style/theme/index.ts';

Sentry.init({
  dsn: 'https://f8ecb83b6573c64f4e133418a5992130@o4505827120054272.ingest.sentry.io/4505827125493760',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.2,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalModalProvider>
          <App />
        </GlobalModalProvider>
      </Provider>
    </ThemeProvider>
  </QueryClientProvider>,
);
