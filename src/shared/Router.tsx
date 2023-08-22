import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, SignInForm, SignUpForm } from '../components';
import GlobalLayout from '../components/common/globalLayout/GlobalLayout';
import { AuthMain, Detail, List, Main, Mypage } from '../pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Main />} />
          <Route element={<Layout />}>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/list" element={<List />} />
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
