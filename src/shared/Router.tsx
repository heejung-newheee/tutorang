import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, SignInForm } from '../components';
import SignUpWrapBox from '../components/Form/SignUpForm/SignUpWrapBox';
import RegistTutorForm from '../components/Form/registTutorForm/RegistTutorForm';
import GlobalLayout from '../components/common/globalLayout/GlobalLayout';
import { AuthMain, Detail, List, Main, Mypage } from '../pages';
import Test from '../pages/Test';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Main />} />
          <Route element={<AuthMain />}>
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpWrapBox />} />
          </Route>
          <Route path="/mypage" element={<Mypage />} />
          <Route element={<Layout />}>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/list" element={<List />} />
            <Route path="/test" element={<Test />} />
            <Route path="/tutor-registration" element={<RegistTutorForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
