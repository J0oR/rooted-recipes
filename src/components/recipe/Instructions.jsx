import { useEffect } from "react";
import style from "./instructions.module.scss";

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
              <li key={index} className={style.instructionRow}>
                <div className={style.listIndex}>
                  <span>{index}</span>
                </div>
                <span className={style.listInstruction}>{inst}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Instructions;
