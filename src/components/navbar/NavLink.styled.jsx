import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  display: flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
  color: #71716c;
  font-size: 1.1rem;
  transition: all 0.3s ease-in-out;
  border-radius: 50%;
  padding: 10px 20px;

  &:hover {
    .icon {
      background-color: #da604e;
      color: #f3f3f3;
      border-radius: 50%;
      padding: 5px;
    }
  }

  &.active {
    color: #da604e;
  }

  .icon {
    font-size: 1.5rem;
    transition: all 0.3s ease-in-out;
    border-radius: 100%;
  }
`;

function NavLinkStyled({ to, children }) {
  return <StyledNavLink to={to}>{children}</StyledNavLink>;
}

export default NavLinkStyled;
