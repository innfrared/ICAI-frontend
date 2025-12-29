import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  UserMenuContainer,
  UserMenuButton,
  UserMenuDropdown,
  UserMenuItem,
  UserMenuDivider,
} from './UserMenu.styles';

const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleProfileClick = (): void => {
    setIsOpen(false);
    navigate('/profile');
  };

  const handleInterviewsClick = (): void => {
    setIsOpen(false);
    navigate('/interviews');
  };

  const handleSettingsClick = (): void => {
    setIsOpen(false);
    // TODO: Navigate to settings page when created
    console.log('Settings clicked');
  };

  const handleLogout = (): void => {
    setIsOpen(false);
    logout();
    navigate('/home');
  };

  return (
    <UserMenuContainer ref={menuRef}>
      <UserMenuButton onClick={() => setIsOpen(!isOpen)} title="User Menu" $isOpen={isOpen}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </UserMenuButton>
      {isOpen && (
        <UserMenuDropdown>
          <UserMenuItem onClick={handleProfileClick}>
            Go to My Profile
          </UserMenuItem>
          <UserMenuItem onClick={handleInterviewsClick}>
            Interviews History
          </UserMenuItem>
          <UserMenuItem onClick={handleSettingsClick}>
            Settings
          </UserMenuItem>
          <UserMenuDivider />
          <UserMenuItem onClick={handleLogout} $danger>
            Logout
          </UserMenuItem>
        </UserMenuDropdown>
      )}
    </UserMenuContainer>
  );
};

export default UserMenu;

