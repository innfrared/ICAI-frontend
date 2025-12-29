import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RequireAuth: React.FC = () => {
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

  if (status === 'anonymous') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return null;
};

export default RequireAuth;

