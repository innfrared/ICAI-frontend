import { useLocation } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  Nav,
  NavLink,
  NavActions,
  AuthButton,
  UserMenuWrapper,
  UserName,
} from './Header.styles';
import { useAuth } from '../../../contexts/AuthContext';
import UserMenu from '../../UserMenu/UserMenu';

const Header: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const getUserDisplayName = (): string => {
    if (user?.first_name) {
      if (user.last_name) {
        return `Hi, ${user.first_name} ${user.last_name}!`;
      }
      return `Hi, ${user.first_name}!`;
    }
    return user?.email ? `Hi, ${user.email}!` : 'Hi, User!';
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/home">Interview Coach</Logo>
        <Nav>
          <NavLink to="/home" $isActive={isActive('/home')}>
            Home
          </NavLink>
          <NavLink to="/interview-coach" $isActive={isActive('/interview-coach')}>
            Interview Coach
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/interviews" $isActive={isActive('/interviews')}>
              Interviews
            </NavLink>
          )}
        </Nav>
        <NavActions>
          {isAuthenticated && user ? (
            <UserMenuWrapper>
              <UserName>{getUserDisplayName()}</UserName>
              <UserMenu />
            </UserMenuWrapper>
          ) : (
            <>
              <AuthButton to="/login" $variant="outline">
                Login
              </AuthButton>
              <AuthButton to="/register" $variant="primary">
                Register
              </AuthButton>
            </>
          )}
        </NavActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
