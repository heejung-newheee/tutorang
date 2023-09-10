import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { RootState } from '../../redux/config/configStore';
import { colors } from '../../style/theme/colors';
import CSHeader from './CSHeader';

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
    <>
      <CSHeader />
      <CustomerServiceContainer>
        <Category>
          <CategoryItem $pathType={'announcements'} $path={path} onClick={handleAnnouncementsNav}>
            공지사항
          </CategoryItem>
          <CategoryItem $pathType={'frequently-asked-questions'} $path={path} onClick={handleFAQNav}>
            FAQ
          </CategoryItem>
          <CategoryItem $pathType={'customer-support'} $path={path} onClick={handleCustomerSupportNav}>
            1:1 문의
          </CategoryItem>
        </Category>
        <PostsContainer>
          <Outlet />
        </PostsContainer>
      </CustomerServiceContainer>
    </>
  );
};

export default CustomerService;

const CustomerServiceContainer = styled.div`
  /* 임시 css */
  box-sizing: border-box;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  height: 1160px;
  display: flex;
  flex-direction: row;
`;

const Category = styled.nav`
  /* 임시 css */
  box-sizing: border-box;
  width: 200px;
  height: 100%;
  border: 1px solid #cdcdcd;
  display: flex;
  flex-direction: column;
`;

const CategoryItem = styled.div<{ $pathType: string; $path: string }>`
  /* 임시 css */
  box-sizing: border-box;
  width: 200px;
  height: 65px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-bottom: 1px solid #cdcdcd;
  color: ${({ $pathType, $path }) => {
    if ($pathType === $path) return `${colors.primary}`;
    else `#000`;
  }};
  &:hover {
    cursor: pointer;
  }
  /* width: 100%; */
  /* height: 100%; */
`;

const PostsContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%; // 왜 안돼......ㅜ
  border: 1px solid #cdcdcd;
  border-left: none;
`;
