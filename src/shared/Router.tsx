import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, SignInForm, SignUpForm } from '../components';
import WelcomeMessagePage from '../components/Form/SignUpForm/WelcomeMessagePage';
import CreateAdditionalInformationForm from '../components/Form/profileForm/CreateAdditionalInformationForm';
import RegistTutorForm from '../components/Form/registTutorForm/RegistTutorForm';
import GlobalLayout from '../components/common/globalLayout/GlobalLayout';
import { Detail, List, Main, Mypage, NotFound } from '../pages';
import Chat from '../pages/Chat';
import AuthenticatedRoute from './AuthenticatedRoute';
import NonAuthenticatedRoute from './NonAuthenticatedRoute';
import EditTutorForm from '../components/Form/registTutorForm/EditTutorForm';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Main />} />
          <Route
            path="/mypage"
            element={
              <AuthenticatedRoute>
                <Mypage />
              </AuthenticatedRoute>
            }
          />
          <Route path="/detail/:id" element={<Detail />} />
          <Route element={<Layout />}>
            <Route path="/list" element={<List />} />
            <Route path="/test" element={<WelcomeMessagePage />} />

            <Route
              path="/additional-information"
              element={
                <AuthenticatedRoute>
                  <CreateAdditionalInformationForm />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/tutor-registration"
              element={
                <AuthenticatedRoute>
                  <RegistTutorForm />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/tutor-class"
              element={
                <AuthenticatedRoute>
                  <EditTutorForm />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <NonAuthenticatedRoute>
                  <SignInForm />
                </NonAuthenticatedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <NonAuthenticatedRoute>
                  <SignUpForm />
                </NonAuthenticatedRoute>
              }
            />
            <Route
              path="/welcome-to-tutorang"
              element={
                <NonAuthenticatedRoute>
                  <WelcomeMessagePage />
                </NonAuthenticatedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <AuthenticatedRoute>
                  <Chat />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
