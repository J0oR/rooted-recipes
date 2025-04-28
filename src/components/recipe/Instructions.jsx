import { useEffect } from "react";
import styled from "styled-components";

export default function Instructions({ steps }) {
  /* useEffect(() =>{
        console.log(steps);
    }, []) */

  return (
    <MainContainer>
      <h1>Method</h1>
      <Container>
        {steps?.map((step, indexStep) => (
          <div key={indexStep}>
            {steps.length > 1 && (
              <h3>
                Step {indexStep + 1} {step.step && `- ${step.step}`}
              </h3>
            )}

            <StepsList>
              {step.instructions.map((inst, index) => (
                <Step key={index}>
                  <StepIndex>{index}</StepIndex>
                  <Instruction>{inst}</Instruction>
                </Step>
              ))}
            </StepsList>
          </div>
        ))}
      </Container>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: clamp(300px, 80%, 550px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;

  h1 {
    font-size: clamp(2rem, 3vw, 10rem);
    font-weight: 800;
    margin: 30px auto 50px auto;
    color: #337179;
    flex-wrap: wrap;
    text-transform: uppercase;
  }
`;

const Container = styled.div``;

const StepsList = styled.ul`
  margin: auto;
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 20px;
  color: rgb(37, 74, 93);
  font-size: 1rem;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 15px;
  background-color: #e9edef;
  border-radius: 32px;
  padding: 20px;
`;

const StepIndex = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 2px solid #337179;
  color: #337179;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-weight: bold;
  font-size: 1.2rem;
`;

const Instruction = styled.span``;
