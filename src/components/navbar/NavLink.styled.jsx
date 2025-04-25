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


export default function NavLinkStyled({ to, className, icon, text }) {
  const IconComponent = icons[icon];

  const [isAnimating, setIsAnimating] = useState(false);


  const handleClick = (e) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); 
  };
  return (
    <StyledNavLink to={to} className={className} onClick={handleClick}>
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
  color: #757575;

  &.active{
    .icon{
      background-color: #C2933F;
      
      color: #f3f3f3;
    }
  }

  &:hover {
    .icon {
      outline: 2px solid #C2933F;
      color: #C2933F;
    }
  }

  &.active:hover{
    .icon{
      color: #f3f3f3;
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
