import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, SignInForm, SignUpForm } from '../components';
import GlobalLayout from '../components/common/globalLayout/GlobalLayout';
import { AuthMain, Detail, List, Main, Mypage } from '../pages';
import Chat from '../pages/Chat';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route element={<Layout />}>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/list" element={<List />} />
            <Route path="/chat" element={<Chat />} />
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
