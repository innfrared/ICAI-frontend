import { Outlet } from 'react-router-dom';
import RequireGuest from '../guards/RequireGuest';

const AuthLayout: React.FC = () => {
  return (
    <>
      <RequireGuest />
      <Outlet />
    </>
  );
};

export default AuthLayout;

