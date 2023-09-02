import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/config/configStore';
import { useSelector } from 'react-redux';

const AuthenticatedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.user.user);
  if (!user) return <Navigate to="/signin" replace />;
  return children;
};

export default AuthenticatedRoute;
