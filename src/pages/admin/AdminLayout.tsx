import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/config/configStore';
import * as S from './AdminLayout.styled';
import AdminSidebar from './adminSidebar/AdminSidebar';

const AdminLayout = () => {
  const navigate = useNavigate();
  const loginUser = useSelector((state: RootState) => state.user.user);
  console.log('loginUser', loginUser);
  useEffect(() => {
    if (loginUser === null || (!!loginUser && loginUser.role !== 'administrator')) {
      navigate('/');
    }
  });
  if (!loginUser)
    return (
      <>
        <div></div>
      </>
    );
  return (
    <>
      <S.Dashboard>
        <AdminSidebar />
        <div>
          <Outlet />
        </div>
      </S.Dashboard>
    </>
  );
};

export default AdminLayout;
