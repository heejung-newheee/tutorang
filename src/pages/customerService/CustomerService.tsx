import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { RootState } from '../../redux/config/configStore';
import { closeModal } from '../../redux/modules';
import CSHeader from './CSHeader';

const CustomerService = () => {
  const loginUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
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
    return () => {
      dispatch(closeModal());
    };
  }, []);

  return (
    <>
      <CSHeader />
      <CustomerServiceContainer>
        <Category>
          <CategoryItem onClick={handleAnnouncementsNav}>공지사항</CategoryItem>
          <CategoryItem onClick={handleFAQNav}>FAQ</CategoryItem>
          <CategoryItem onClick={handleCustomerSupportNav}>1:1 문의</CategoryItem>
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
  height: 850px;
  display: flex;
  flex-direction: row;
`;

const Category = styled.nav`
  /* 임시 css */
  width: 200px;
  height: 100%;
  padding: 20px;
  border: 2px solid #cdcdcd;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CategoryItem = styled.div`
  /* 임시 css */
  border-bottom: 2px solid #cdcdcd;
  &:hover {
    cursor: pointer;
  }
  /* width: 100%; */
  /* height: 100%; */
`;

const PostsContainer = styled.div`
  width: 100%;
  height: 100%; // 왜 안돼......ㅜ
`;
