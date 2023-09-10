import * as S from './AdminLayout.styled';
import { AdminSidebar } from './modules';
import { Outlet } from 'react-router-dom';

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
