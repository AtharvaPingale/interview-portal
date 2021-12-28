import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Finish(props) {
  const [answers, setAnswers] = useState();
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setScore(0);
    if (props.data) {
      if (localStorage.getItem(props.data[0].name)) {
        setAnswers(JSON.parse(localStorage.getItem(props.data[0].name)));
        setQuestions(props.data[0].questions);
      } else if (localStorage.getItem(props.data[1].name)) {
        setAnswers(JSON.parse(localStorage.getItem(props.data[1].name)));
        setQuestions(props.data[1].questions);
        setIndex(1);
      } else {
        setAnswers(JSON.parse(localStorage.getItem(props.data[2].name)));
        setQuestions(props.data[2].questions);
        setIndex(2);
      }
    }
  }, [props.data]);

  useEffect(() => {
    if (answers && questions) {
      for (let i = 0; i < questions.length; i++) {
        answers.forEach((answer) => {
          // console.log(typeof answer.selectedOption);
          if (answer.id === questions[i]._id) {
            if (typeof answer.selectedOption === "number") {
              if (answer.selectedOption === questions[i].correctOptionIndex) {
                setScore((prev) => prev + 1);
                // console.log("correct");
              }
            } else if (typeof answer.selectedOption === "object")
              if (
                JSON.stringify(answer.selectedOption.sort()) ===
                JSON.stringify(questions[i].correctOptionIndex)
              ) {
                setScore((prev) => prev + 1);
              }
          }
        });
      }
    }
  }, [answers, questions]);

  useEffect(() => {
    return () => {
      clearData();
    };
  }, []);

  const clearData = () => {
    localStorage.removeItem(props.data[index].name);
  };
  // console.log(answers, questions);

  return (
    <>
      <h1>{props.data && props.data[index].name} - Result</h1>
      <div className="question-container">
        <h2>Correct Answers: {score}</h2>
        <h2>Wrong Answers: {questions && questions.length - score}</h2>
      </div>
      <Link to="/">
        <button className="home-btn">Home</button>
      </Link>
    </>
  );
}

export default Finish;
