import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/config/configStore';

const AdminRoute = () => {
  const navigate = useNavigate();
  const loginUser = useSelector((state: RootState) => state.user.user);
  console.log(loginUser);
  console.log(!!loginUser && loginUser.role !== 'administrator');
  useEffect(() => {
    if (!!loginUser && loginUser.role !== 'administrator') {
      console.log('여기있니');
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
