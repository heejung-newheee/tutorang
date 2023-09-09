import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, SignInForm, SignUpForm } from '../components';
import GlobalLayout from '../components/common/globalLayout/GlobalLayout';
import { Detail, List, Main, Mypage, NotFound } from '../pages';
import WelcomeMessagePage from '../pages/auth/SignUpForm/WelcomeMessagePage';
import RegistTutorForm from '../pages/auth/registTutorForm/RegistTutorForm';
import Chat from '../pages/chat/Chat';
import CustomerService from '../pages/customerService/CustomerService';
import Announcements from '../pages/customerService/announcements/Announcements';
import CustomerSupport from '../pages/customerService/customerSupport/CustomerSupport';
import LeaveInquiryForm from '../pages/customerService/customerSupport/LeaveInquiryForm';
import FrequentlyAskedQuestions from '../pages/customerService/fequentlyAskedQuestions/FrequentlyAskedQuestions';
import EditTutorForm from '../pages/mypage/EditTutorForm';
import CreateAdditionalInformationForm from '../pages/mypage/profileForm/CreateAdditionalInformationForm';
import AuthenticatedRoute from './AuthenticatedRoute';
import NonAuthenticatedRoute from './NonAuthenticatedRoute';

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
            <Route
              path="/leave-inquiry"
              element={
                <AuthenticatedRoute>
                  <LeaveInquiryForm />
                </AuthenticatedRoute>
              }
            ></Route>

            <Route path="/customer-service" element={<CustomerService />}>
              <Route path="announcements" element={<Announcements />} />
              <Route path="frequently-asked-questions" element={<FrequentlyAskedQuestions />} />
              <Route
                path="customer-support"
                element={
                  <AuthenticatedRoute>
                    <CustomerSupport />
                  </AuthenticatedRoute>
                }
              />
            </Route>

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
