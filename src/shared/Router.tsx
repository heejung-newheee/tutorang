import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, SignInForm, SignUpForm } from '../components';
import CreateProfileForm from '../components/Form/profileForm/CreateProfileForm';
import RegistTutorForm from '../components/Form/registTutorForm/RegistTutorForm';
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
          <Route path="/detail/:id" element={<Detail />} />
          <Route element={<Layout />}>
            <Route path="/list" element={<List />} />
            <Route path="/additional-information" element={<CreateProfileForm />} />
            <Route path="/tutor-registration" element={<RegistTutorForm />} />
            <Route element={<AuthMain />}>
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
            </Route>
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
