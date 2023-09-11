import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminLayout, Layout, SignInForm, SignUpForm } from '../components';
import GlobalLayout from '../components/common/globalLayout/GlobalLayout';
import { Community, Dashboard, Detail, FreeCommunity, List, Main, Mypage, NotFound, PostDetail, QuestionCommunity, RegionCommunity, StudyCommunity, UserManage, WritePost } from '../pages';
import WelcomeMessagePage from '../pages/auth/SignUpForm/WelcomeMessagePage';
import RegistTutorForm from '../pages/auth/registTutorForm/RegistTutorForm';
import Chat from '../pages/chat/Chat';
import CustomerService from '../pages/customerService/CustomerService';
import Announcements from '../pages/customerService/announcements/Announcements';
import CustomerSupport from '../pages/customerService/customerSupport/CustomerSupport';
import DetailCustomerSupport from '../pages/customerService/customerSupport/DetailCustomerSupport';
import EditInquiryForm from '../pages/customerService/customerSupport/EditInquiryForm';
import LeaveInquiryForm from '../pages/customerService/customerSupport/LeaveInquiryForm';
import FrequentlyAskedQuestions from '../pages/customerService/fequentlyAskedQuestions/FrequentlyAskedQuestions';
import MatchedReview from '../pages/matchingReview/MatchedReview';
import EditTutorForm from '../pages/mypage/EditTutorForm';
import CreateAdditionalInformationForm from '../pages/mypage/profileForm/CreateAdditionalInformationForm';
import EditProfileForm from '../pages/mypage/profileForm/EditProfileForm';
import AuthenticatedRoute from './AuthenticatedRoute';
import NonAuthenticatedRoute from './NonAuthenticatedRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-manage" element={<UserManage />} />
        </Route>
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
          <Route path="/review" element={<MatchedReview />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/post/:postid" element={<PostDetail />} />

          <Route element={<Layout />}>
            <Route path="/list" element={<List />} />
            <Route path="/write/:category" element={<WritePost />} />
            <Route path="/post/:postid" element={<PostDetail />} />
            <Route
              path="/leave-inquiry"
              element={
                <AuthenticatedRoute>
                  <LeaveInquiryForm />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/edit-inquiry/:inquiryid"
              element={
                <AuthenticatedRoute>
                  <EditInquiryForm />
                </AuthenticatedRoute>
              }
            />

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
              <Route
                path="customer-support/:inquiryid"
                element={
                  <AuthenticatedRoute>
                    <DetailCustomerSupport />
                  </AuthenticatedRoute>
                }
              />
            </Route>

            <Route path="/community" element={<Community />}>
              <Route path="free" element={<FreeCommunity />} />
              <Route path="study" element={<StudyCommunity />} />
              <Route path="question" element={<QuestionCommunity />} />
              <Route path="region" element={<RegionCommunity />} />
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
            <Route
              path="/edit-profiles"
              element={
                <AuthenticatedRoute>
                  <EditProfileForm />
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
