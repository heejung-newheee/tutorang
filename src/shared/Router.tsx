<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Detail, Main, Mypage } from '../pages';
import AuthMain from '../pages/AuthMain';
=======
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Main, Detail, Mypage, SignIn, SignUp } from '../pages';
import { Layout } from '../components';
import GlobalLayout from '../components/common/globalLayout/GlobalLayout';
>>>>>>> df9fe36e9385b168ef4abb35fe9af7b3f4a71158

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/auth-main" element={<AuthMain />} />
        {/* 아래의 signIn, signUp을 AuthMain으로 합치고 pages -> component폴더로 빼려하는데 괜찮을까여? */}
        {/* <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> */}
=======
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Main />} />
          <Route element={<Layout />}>
            <Route path="/detail" element={<Detail />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Route>
>>>>>>> df9fe36e9385b168ef4abb35fe9af7b3f4a71158
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
