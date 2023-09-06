import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';
import store from './redux/config/configStore.ts';
import { theme } from './style/theme/index.ts';

// 에러 모니터링 Sentry 삭제하지 마세요
// Sentry.init({
//   dsn: 'https://f8ecb83b6573c64f4e133418a5992130@o4505827120054272.ingest.sentry.io/4505827125493760',
//   integrations: [new BrowserTracing()],
//   // Set tracesSampleRate to 1.0 to capture 100%
//   tracesSampleRate: 0.2,
// });

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </QueryClientProvider>,
);
