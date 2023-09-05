import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../..';
import GlobalModal from '../../modal/GlobalModal';
import ScrollTop from '../ScrollTop';
import ScrollToTop from './ScrollToTop';

const GlobalLayout = () => {
  return (
    <>
      <ScrollToTop />
      <ScrollTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <GlobalModal />
    </>
  );
};

export default GlobalLayout;
