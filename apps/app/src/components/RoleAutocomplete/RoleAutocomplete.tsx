import { useState, useRef, useEffect, type ChangeEvent, type KeyboardEvent } from 'react';
import {
  AutocompleteContainer,
  Input,
  OptionsList,
  Option,
} from './RoleAutocomplete.styles';

export type Role = 'frontend' | 'backend' | 'fullstack' | 'devops' | 'mobile';

export interface RoleOption {
  value: Role;
  label: string;
}

interface RoleAutocompleteProps {
  value: Role | '';
  onChange: (value: Role) => void;
  options: RoleOption[];
  required?: boolean;
}

const RoleAutocomplete: React.FC<RoleAutocompleteProps> = ({
  value,
  onChange,
  options,
  required = false,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedRole = options.find((role) => role.value === value);

  const filteredRoles = options.filter((role) =>
    role.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Initialize searchTerm from value prop
  useEffect(() => {
    if (value && selectedRole) {
      setSearchTerm(selectedRole.label);
    } else if (!value) {
      setSearchTerm('');
    }
  }, [value, selectedRole]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm(selectedRole?.label || '');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedRole]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleInputFocus = (): void => {
    setIsOpen(true);
    // Show all options when focused, clear search to show all
    if (!searchTerm) {
      setSearchTerm('');
    }
  };

  const handleSelect = (role: RoleOption): void => {
    onChange(role.value);
    setSearchTerm(role.label);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredRoles.length - 1 ? prev + 1 : prev
      );
      setIsOpen(true);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredRoles[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <AutocompleteContainer ref={containerRef}>
      <Input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder="Search for a role..."
        required={required}
      />
      {isOpen && (
        <OptionsList>
          {filteredRoles.length > 0 ? (
            filteredRoles.map((role, index) => (
              <Option
                key={role.value}
                $isHighlighted={index === highlightedIndex}
                onClick={() => handleSelect(role)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {role.label}
              </Option>
            ))
          ) : (
            <Option $isHighlighted={false} style={{ cursor: 'default', color: '#999' }}>
              No options found
            </Option>
          )}
        </OptionsList>
      )}
    </AutocompleteContainer>
  );
};

export default RoleAutocomplete;
