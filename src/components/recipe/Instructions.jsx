import { useEffect } from "react";
import style from "./instructions.module.scss";
import styled from "styled-components";

function Instructions({ steps }) {
  /* useEffect(() =>{
        console.log(steps);
    }, []) */

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Instructions</h2>
      </div>
      {steps?.map((step, indexStep) => (
        <div key={indexStep}>
          {steps.length > 1 && (
            <h3>
              Step {indexStep + 1} {step.step && `- ${step.step}`}
            </h3>
          )}

          <ul className={style.stepsList}>
            {step.instructions.map((inst, index) => (
              <Step key={index}>
                <StepIndex>{index}</StepIndex>
                <span className={style.listInstruction}>{inst}</span>
              </Step>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Instructions;

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
