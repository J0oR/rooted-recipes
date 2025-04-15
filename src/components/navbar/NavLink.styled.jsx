import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  display: flex;
      align-items: center;
      
      text-decoration: none;
      color: black;
      font-size: 1.1rem;
      
      
      &.active {
        color: #e91e63;
      }

      .icon{
        font-size: 1.5rem;}
`;

function NavLinkStyled({ to, children }) {
  return <StyledNavLink to={to}>{children}</StyledNavLink>;
}

export default NavLinkStyled;
