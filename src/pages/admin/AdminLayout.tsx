import { Outlet } from 'react-router-dom';
import * as S from './AdminLayout.styled';
import AdminSidebar from './adminSidebar/AdminSidebar';

const AdminLayout = () => {
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
