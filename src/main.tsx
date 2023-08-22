import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Provider } from 'react-redux';
// import store from './redux/config/configStore.ts';
import GlobalStyles from './style/GlobalStyle.ts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {/* <Provider store={store}> */}
    <GlobalStyles />
    <App />
    {/* </Provider> */}
  </QueryClientProvider>,
);
