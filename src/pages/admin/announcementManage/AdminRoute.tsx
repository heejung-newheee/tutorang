import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/config/configStore';

const AdminRoute = () => {
  const navigate = useNavigate();
  const loginUser = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    if (!!loginUser && loginUser.role !== 'administrator') {
      navigate('/');
    }
  });
  if (!loginUser)
    return (
      <>
        <div></div>;
      </>
    );
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminRoute;
