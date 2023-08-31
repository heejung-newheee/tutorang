import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../..';
import ScrollTop from '../ScrollTop';

const GlobalLayout = () => {
  return (
    <>
      <ScrollTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default GlobalLayout;
