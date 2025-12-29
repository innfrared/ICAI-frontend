import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RequireGuest: React.FC = () => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (status === 'authenticated') {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/home';
    return <Navigate to={from} replace />;
  }

  return null;
};

export default RequireGuest;

