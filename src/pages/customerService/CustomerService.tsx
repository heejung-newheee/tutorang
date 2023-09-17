import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import FormHeader from '../../components/Form/FormHeader';
import { FORM_CONSTANT_TITLE_CUSTOMER } from '../../constants/formConstant';
import { AppDispatch, RootState } from '../../redux/config/configStore';
import { clearModal, openModal } from '../../redux/modules';
import * as S from './CustomerService.styled';

const CustomerService = () => {
  const { isConfirm, modalId } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector((state: RootState) => state.user.user);
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const navigate = useNavigate();

  const handleCustomerSupportNav = () => {
    if (loginUser) return navigate('customer-support');
    dispatch(openModal({ type: 'confirm', message: '로그인이 필요한 서비스입니다. 로그인하시겠습니까?', modalId: 'handleCustomerSupportNav' }));
  };

  const handleAnnouncementsNav = () => {
    navigate('announcements');
  };

  useEffect(() => {
    if (isConfirm && modalId === 'handleCustomerSupportNav') navigate('/signin');
    return () => {
      dispatch(clearModal());
    };
  }, [isConfirm]);

  return (
    <div>
      <FormHeader $keyword={FORM_CONSTANT_TITLE_CUSTOMER} />
      <S.CustomerServiceContainer>
        <S.ResponsivMenu>
          <S.ResponsivMenuItem $pathType={'announcements'} $path={path} onClick={handleAnnouncementsNav}>
            공지사항
          </S.ResponsivMenuItem>
          <S.ResponsivMenuItem $pathType={'customer-support'} $path={path} onClick={handleCustomerSupportNav}>
            1:1문의
          </S.ResponsivMenuItem>
        </S.ResponsivMenu>
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
