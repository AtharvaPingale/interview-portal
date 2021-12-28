import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Question from "./Question";

function Test(props) {
  const { id } = useParams();
  const [index, setIndex] = useState();
  const [length, setLength] = useState(-1);
  let post = props.data;
  let questionsArr = post && post.questions;

  useEffect(() => {
    if (!localStorage.getItem(post && post.name))
      localStorage.setItem(post && post.name, "[]");
  }, []);
  useEffect(() => {
    setLength((questionsArr && questionsArr.length) || 7);
  }, [questionsArr]);

  useEffect(() => {
    if (!id) {
      setIndex(1);
    } else setIndex(parseInt(id));
  });

  const incrementIndex = () => {
    if (index >= questionsArr.length) return;
    else setIndex((prev) => prev + 1);
  };
  const decrementIndex = () => {
    if (index <= 0) return;
    else setIndex((prev) => prev - 1);
  };
  // console.log(length);
  return (
    <>
      {index <= length ? (
        <>
          <h1>{post && post.name}</h1>
          <div className="question-container">
            <h3>Question {index}</h3>
            <Question
              question={questionsArr && questionsArr[index - 1]}
              testName={post && post.name}
            />
          </div>
          <div className="buttons">
            <div className="flex">
              {index > 1 ? (
                <Link
                  to={`/${post && post.name.replace(/\s/g, "")}/${index - 1}`}
                >
                  <button onClick={decrementIndex}>Previous</button>
                </Link>
              ) : (
                <></>
              )}
              {questionsArr && index < questionsArr.length ? (
                <Link
                  to={`/${post && post.name.replace(/\s/g, "")}/${index + 1}`}
                >
                  <button onClick={incrementIndex}>Next</button>
                </Link>
              ) : (
                <></>
              )}
            </div>
            <Link to="/Finish">
              <button className="finish-btn">Finish</button>
            </Link>
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default Test;
