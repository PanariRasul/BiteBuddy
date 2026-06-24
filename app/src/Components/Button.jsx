// app/src/components/Button.jsx
import styled from "styled-components";

const Button = ({ name, onClick, isActive }) => {
    return (
        <StyledButton
            onClick={onClick}
            className={isActive ? "active" : ""}
            aria-pressed={isActive}
        >
            {name}
        </StyledButton>
    );
};

export default Button;

/* High-End Minimalist Button Styling */
const StyledButton = styled.button`
  color: #1d1d1f;
  background-color: rgba(0, 0, 0, 0.04);
  padding: 8px 16px;
  outline: none;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  /* Distinctive active design highlighting */
  &.active {
    color: white;
    background-color: #ff4343;
    box-shadow: 0 4px 12px rgba(255, 67, 67, 0.25);
  }

  &:focus-visible {
    border-color: #ff4343;
    box-shadow: 0 0 0 4px rgba(255, 67, 67, 0.15);
  }
`;