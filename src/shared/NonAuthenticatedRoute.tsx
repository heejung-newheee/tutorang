import { useSelector } from 'react-redux';
import { RootState } from '../redux/config/configStore';
import { Navigate } from 'react-router-dom';

const NonAuthenticatedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.user.user);
  if (user) return <Navigate to="/" replace />;
  return children;
};

export default NonAuthenticatedRoute;
