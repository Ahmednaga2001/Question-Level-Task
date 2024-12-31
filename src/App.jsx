import React, { useEffect, useState } from "react";
import { questions } from "./data";
import "./style.css";

const App = () => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState([]);
  const [score, setScore] = useState([]);
  const [resultMessage, setResultMessage] = useState("");

  const handleChange = (e, index) => {
    const updatedValues = [...values];
    updatedValues[index] = e.target.value;
    setValues(updatedValues);
  };

  const handleNextStep = () => {
    setStep(step + 1);
    setValues([]);
    setResultMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleScore();
    if (score[step] >= 50) {
      handleNextStep();
    }
  };

  const handleScore = () => {
    const scoreStep = questions[step].reduce((acc, current, index) => {
      return parseInt(values[index]) === current.answer ? acc + 1 : acc;
    }, 0);

    const newScore = scoreStep * 10;
    setScore((prev) => {
      const updatedScore = [...prev];
      updatedScore[step] = newScore;
      return updatedScore;
    });

    if (newScore >= 50) {
      setResultMessage("Success");
      handleNextStep();
    } else {
      setResultMessage(`You need at least 50 to proceed to the next level.`);
    }
  };

  const totalScore = score.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="container">
      <h2>{step < 3 ? `Level ${step + 1}` : "Final Results"}</h2>
      {step < 3 ? (
        <form onSubmit={handleSubmit}>
          {questions[step].map((q, index) => {
            return (
              <div key={index} className="inp">
                <label htmlFor={index}>{q.question}</label>
                <input
                id={index}
                  required
                  type="text"
                  value={values[index] || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            );
          })}
          <div className="buttons">
            {resultMessage && <p className="fa">{resultMessage}</p>}
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : (
        <div className="results">
          <h3>Level 1 Score : {score[0]}</h3>
          <h3>Level 2 Score : {score[1]}</h3>
          <h3>Level 3 Score : {score[2]}</h3>
          <h3>Final Score: {totalScore}</h3>
          <button onClick={() => setStep(0)}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default App;
