import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Detail, Main, Mypage } from '../pages';
import AuthMain from '../pages/AuthMain';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/auth-main" element={<AuthMain />} />
        {/* 아래의 signIn, signUp을 AuthMain으로 합치고 pages -> component폴더로 빼려하는데 괜찮을까여? */}
        {/* <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
