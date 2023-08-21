import React from 'react';
import { Outlet } from 'react-router-dom';
import * as S from './GlobalLayout.styled';
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
