import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/config/configStore';
import CSHeader from './CSHeader';
import * as S from './CustomerService.styled';

const CustomerService = () => {
  const loginUser = useSelector((state: RootState) => state.user.user);
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  console.log('lookhere', location);

  const navigate = useNavigate();
  const handleCustomerSupportNav = () => {
    if (loginUser) {
      navigate('customer-support');
    } else {
      const wantToSignin = window.confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?');
      if (wantToSignin) {
        navigate('/signin');
      } else {
        return false;
      }
    }
  };
  const handleAnnouncementsNav = () => {
    navigate('announcements');
  };
  const handleFAQNav = () => {
    navigate('frequently-asked-questions');
  };

  useEffect(() => {
    // if
    // navigate('announcements');
  }, []);

  return (
    <div>
      <CSHeader />
      <S.CustomerServiceContainer>
        <S.Category>
          <S.CategoryItem $pathType={'announcements'} $path={path} onClick={handleAnnouncementsNav}>
            공지사항
          </S.CategoryItem>
          <S.CategoryItem $pathType={'frequently-asked-questions'} $path={path} onClick={handleFAQNav}>
            FAQ
          </S.CategoryItem>
          <S.CategoryItem $pathType={'customer-support'} $path={path} onClick={handleCustomerSupportNav}>
            1:1 문의
          </S.CategoryItem>
        </S.Category>
        <S.PostsContainer>
          <Outlet />
        </S.PostsContainer>
      </S.CustomerServiceContainer>
    </div>
  );
};

export default CustomerService;
