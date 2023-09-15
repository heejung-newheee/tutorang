import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import FormHeader from '../../components/Form/FormHeader';
import { FORM_CONSTANT_TITLE_CUSTOMER } from '../../constants/formConstant';
import { RootState } from '../../redux/config/configStore';
import * as S from './CustomerService.styled';

const CustomerService = () => {
  const loginUser = useSelector((state: RootState) => state.user.user);
  const location = useLocation();
  const path = location.pathname.split('/')[2];

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

  return (
    <div>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_CUSTOMER} />
      <S.CustomerServiceContainer>
        <S.Category>
          <S.CategoryItem $pathType={'announcements'} $path={path} onClick={handleAnnouncementsNav}>
            공지사항
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
