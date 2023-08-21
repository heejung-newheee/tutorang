import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Main, Detail, Mypage, SignIn, SignUp } from '../pages';
import { Layout } from '../components';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<Layout />}>
          <Route path="/detail" element={<Detail />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
