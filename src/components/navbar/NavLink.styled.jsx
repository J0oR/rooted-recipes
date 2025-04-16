import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  display: flex;
  gap: 20px;
  align-items: center;
  text-decoration: none;
  color: #71716c;
  font-size: 1.1rem;

  &.active {
    color: #da604e;
  }

  .icon {
    font-size: 1.5rem;
  }
  
`;

function NavLinkStyled({ to, children }) {
  return <StyledNavLink to={to}>{children}</StyledNavLink>;
}

export default NavLinkStyled;
