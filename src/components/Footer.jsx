import { AiFillGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterContainer>
      <p>© 2025 Rooted Recipes.</p>
      <p>student project developed by <span>Giovanni Ruocco</span> for <S2Ilink href="https://www.start2impact.it/" target="_blank" rel="noopener noreferrer">Start2Impact University</S2Ilink></p>
      <Links>
        <a href="https://github.com/J0oR" target="_blank" rel="noopener noreferrer">
          <AiFillGithub />
        </a>
        <a href="https://www.linkedin.com/in/giovanni-ruocco/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
          </a>
      </Links>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background-color: transparent;
  color: #337179;
  font-size: 1.2rem;
  padding: 100px 0;
  border-top: 4px solid #337179;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  margin: 200px auto 0 auto;

  span{
    color: #337179;
    font-weight: 700;
  }
`;

const S2Ilink = styled.a`
  color: #337179;
  text-decoration: none;
  font-weight: 700 !important;
`;

const Links = styled.div`
  display: flex;
  gap: 20px;

   a{

    cursor: pointer;

    svg{
      color: #244B5E;
      font-size: 2rem;
      transition: all 0.2s ease-in-out;

      &:hover{
        color: #337179;
        transform: scale(1.2);
      }
    }
  }
`;
