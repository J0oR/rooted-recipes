import { useEffect } from "react";
import style from "./instructions.module.scss";

function Instructions({ steps }) {

    /* useEffect(() =>{
        console.log(steps);
    }, []) */

  return (
    <div>
      {steps?.map((step, indexStep) => (
        <div key={indexStep}>
          {steps.length > 1 && (
            <h3>
              Step {indexStep + 1} {step.step && `- ${step.step}`}
            </h3>
          )}

          <ul className={style.list}>
            {step.instructions.map((inst, index) => (
                <li key={index} className={style.instructionRow}>
                    <span className={style.index}>{index}</span>
                    <span className={style.instruction}>{inst}</span>
                </li>
              /* // Split the instruction by period and trim spaces
              const sentences = inst
                .split(".")
                .map((sentence) => sentence.trim())
                .filter(Boolean);

              return sentences.map((sentence, sentenceIndex) => (
                <li key={`${index}-${sentenceIndex}`}>
                  <span>{index}</span>
                  <span></span>
                  {sentence}
                </li>
              )); */
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Instructions;
