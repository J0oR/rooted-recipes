import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";

const icons = {
  home: FaHome,
  heart: AiOutlineHeart,
  user: AiOutlineUser,
};


export default function NavLinkStyled({ to, className, icon, text, showModal }) {
  const IconComponent = icons[icon];

  const [isAnimating, setIsAnimating] = useState(false);


  const handleClick = (e) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); 
  };
  return (
    <StyledNavLink to={to} className={className} onClick={handleClick} $visible={showModal}>
        {IconComponent && <IconComponent className={`icon ${isAnimating ? "animating" : ""}`} />}
      {text}
    </StyledNavLink>
  );
}

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: #337179;

  opacity: ${({ $visible }) => ($visible ? 0 : 1)};
  transition: opacity 0.1s ease-in-out;


  &.active{
    .icon{
      background-color: #337179;
      
      color: #FFFFFF;
    }
  }

  &:hover {
    .icon {
      outline: 2px solid #337179;
      color: #337179;
    }
  }

  &.active:hover{
    .icon{
      color: #FFFFFF;
      outline: none;
    }
  }

  .icon {
    padding: 5px;
    font-size: 2rem;
    border-radius: 50%;

    &.animating {
    animation: clickAnimation 0.3s ease-in-out;
  }

  @keyframes clickAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  } 
  }
`;
