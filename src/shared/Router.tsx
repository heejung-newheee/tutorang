import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../components';
import GlobalLayout from '../components/common/globalLayout/GlobalLayout';
import { Detail, Main, Mypage, SignInForm, SignUpForm } from '../pages';
import AuthMain from '../pages/AuthMain';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Main />} />
          <Route element={<Layout />}>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route element={<AuthMain />}>
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
