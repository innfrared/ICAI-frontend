import { useTheme } from '../../contexts/ThemeContext';
import { ToggleButton, ToggleIcon, MoonIcon, SunIcon } from './DarkModeToggle.styles';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <ToggleButton
      onClick={toggleDarkMode}
      $isDarkMode={isDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <ToggleIcon $isDarkMode={isDarkMode}>
        {isDarkMode ? <MoonIcon /> : <SunIcon />}
      </ToggleIcon>
    </ToggleButton>
  );
};

export default DarkModeToggle;

