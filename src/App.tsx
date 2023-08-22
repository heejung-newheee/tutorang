import Router from './shared/Router';
import GlobalStyle from './style/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

export default App;
