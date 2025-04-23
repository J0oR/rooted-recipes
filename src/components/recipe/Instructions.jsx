import { useEffect } from "react";
import styled from "styled-components";

function Instructions({ steps }) {
  /* useEffect(() =>{
        console.log(steps);
    }, []) */

  return (
    <>
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
    </>
  );
}

export default Instructions;



const StepsList = styled.ul`
width: 100%;
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 20px;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  background-color: #fbf5ec;
  padding: 20px;
  border-radius: 15px;
`;

const StepIndex = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 1px solid #c1933f;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Instruction = styled.span`
    
`;