import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, SignInForm, SignUpForm } from '../components';
import ScrollToTop from '../components/common/ScrollToTop';
import GlobalLayout from '../components/common/globalLayout/GlobalLayout';
import ToastContainer from '../components/dialog/toast/ToastContainer';
import GlobalModal from '../components/modal/GlobalModal';
import {
  AdminLayout,
  AdminRoute,
  AnnouncementDetailManage,
  Announcements,
  AnnouncementsListManage,
  BoardManage,
  CSManage,
  CSManageDetail,
  Chat,
  Community,
  CreateAdditionalInformationForm,
  CreateAnnouncementForm,
  CustomerService,
  CustomerSupport,
  Dashboard,
  Detail,
  DetailAnnouncement,
  DetailCustomerSupport,
  EditAnnouncementForm,
  EditInquiryForm,
  EditTutorForm,
  FreeCommunity,
  LeaveInquiryForm,
  List,
  Main,
  MatchedReview,
  MyEditPage,
  MyPage,
  NotFound,
  PostDetail,
  QuestionCommunity,
  RegionCommunity,
  RegistTutorForm,
  StudyCommunity,
  UserManage,
  WelcomeMessagePage,
  WritePost,
} from '../pages';
import Test from '../pages/test/Test';
import AuthenticatedRoute from './AuthenticatedRoute';
import NonAuthenticatedRoute from './NonAuthenticatedRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalModal />
      <ToastContainer />
      <Routes>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-manage" element={<UserManage />} />
          <Route path="customer-support-manage" element={<CSManage />} />
          <Route path="customer-support-manage/:inquiryid" element={<CSManageDetail />} />
          <Route path="board-manage" element={<BoardManage />} />

          <Route path="announcements-manage" element={<AnnouncementsListManage />} />
          <Route path="announcements-manage/:announcementid" element={<AnnouncementDetailManage />} />
        </Route>
        <Route path="/admin-form" element={<AdminRoute />}>
          <Route path="create-announcement" element={<CreateAnnouncementForm />} />
          <Route path="edit-announcement/:announcementid" element={<EditAnnouncementForm />} />
        </Route>

        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Main />} />
          <Route
            path="/mypage"
            element={
              <AuthenticatedRoute>
                <MyPage />
              </AuthenticatedRoute>
            }
          />
          <Route path="/review" element={<MatchedReview />} />
          <Route path="/detail/:id" element={<Detail />} />

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
              <Route path="announcements/:announcementid" element={<DetailAnnouncement />} />
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
                  <MyEditPage />
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
