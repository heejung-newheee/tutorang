import GlobalModal from './components/modal/GlobalModal';
import Router from './shared/Router';
import GlobalStyle from './style/GlobalStyle';

function App() {
  return (
    <>
      <Router />
      <GlobalStyle />
      <GlobalModal />
    </>
  );
}

export default App;
