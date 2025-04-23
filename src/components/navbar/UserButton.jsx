import styled from "styled-components";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import LogoutModal from "./LogoutModal";
import Button from "../common/Button";

export default function UserButton({ className, text }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <Container>
      <UsrButton className={`${showModal ? "active" : ""}`} onClick={toggleModal}>
        <AiOutlineUser className={`icon ${isAnimating ? "animating" : ""} `} />
        {text}
      </UsrButton>
      <LogoutModal modalState={showModal} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const UsrButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: #757575;
  border: none;
  background-color: transparent;

  &.active {
  .icon {
      outline: none;
      background-color: #da604e;
      color: #f3f3f3;
    }
  }

  &:hover {
    .icon {
      outline: 2px solid #da604e;
      color: #da604e;
    }
  }

  &.active:hover {
    .icon {
      color: #f3f3f3;
      outline: none;
    }
  }

  .icon {
    padding: 5px;
    font-size: 2rem;
    border-radius: 50%;

    &.animating {
      animation: clickAnimation 0.3s ease;
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
