import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../..';
import ScrollTop from '../ScrollTop';

const GlobalLayout = () => {
  return (
    <>
      <ScrollTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default GlobalLayout;
