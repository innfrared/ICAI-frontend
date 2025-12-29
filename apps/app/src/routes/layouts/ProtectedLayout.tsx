import { Outlet } from 'react-router-dom';
import RequireAuth from '../guards/RequireAuth';

const ProtectedLayout: React.FC = () => {
  return (
    <>
      <RequireAuth />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
