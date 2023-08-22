import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../..';

const GlobalLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default GlobalLayout;
