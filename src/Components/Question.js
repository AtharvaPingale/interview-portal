import React, { useState, useEffect } from "react";

function Question(props) {
  const [checked, setChecked] = useState([]);
  const [radioChecked, setRadioChecked] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [next, setNext] = useState(false);
  const [testObject, setTestObject] = useState([]);
  const [marked, setMarked] = useState();
  const [markedArr, setMarkedArr] = useState([]);

  let question = props.question;
  let testName = props.testName;
  let type = "radio";

  if (question && question.type) {
    type = "checkbox";
  }

  let options = question && question.options;

  const handleOnChange = (i) => {
    if (type === "checkbox") {
      console.log(typeof markedArr);
      if (typeof markedArr === "object" && markedArr.includes(i)) {
        setChecked(markedArr.filter((index) => index !== i));
      } else if (typeof markedArr === "object") setChecked([...markedArr, i]);
      else setChecked([i]);
    } else if (type === "radio") {
      setRadioChecked(i);
      setNext((prev) => !prev);
    }
  };

  const updateItem = (qid, itemAttributes) => {
    let index = -1;
    index = testObject.findIndex((x) => x.id === qid);
    if (index === -1) return false;
    else {
      if (itemAttributes != null)
        setTestObject([
          ...testObject.slice(0, index),
          { id: qid, selectedOption: itemAttributes },
          ...testObject.slice(index + 1),
        ]);
      return true;
    }
  };
  const getData = () => {
    let tempdata = testName && JSON.parse(localStorage.getItem(testName));
    setTestObject(tempdata);
    console.log(tempdata);
    let qid = question && question._id;
    let i = -1;
    i = tempdata && tempdata.findIndex((x) => x.id === qid);
    // console.log(i);

    if (i !== null) {
      if (type === "radio") {
        setMarked(tempdata[i] && tempdata[i].selectedOption);
        setMarkedArr([]);
      } else {
        console.log("setting markedarr");
        console.log(tempdata[i] && tempdata[i].selectedOption);
        // setChecked(tempdata[i] && tempdata[i].selectedOption);
        setMarkedArr(tempdata[i] && tempdata[i].selectedOption);
        setMarked();
      }
    }
    console.log("Loading");
  };
  useEffect(() => {
    getData();
  }, [props]);

  // useEffect(() => {}, []);

  useEffect(() => {
    setClicked((prev) => !prev);
    setMarked(radioChecked);
    if (updateItem(question && question._id, radioChecked)) return;
    setTestObject([
      ...testObject,
      {
        id: question && question._id,
        selectedOption: radioChecked,
      },
    ]);
  }, [radioChecked, next]);

  useEffect(() => {
    setClicked((prev) => !prev);
    setMarkedArr(checked);
    if (updateItem(question && question._id, checked)) return;
    setTestObject([
      ...testObject,
      {
        id: question && question._id,
        selectedOption: checked,
      },
    ]);
  }, [checked]);

  useEffect(() => {
    if (testObject.length)
      localStorage.setItem(testName, JSON.stringify(testObject));

    // console.log(testObject);
  }, [clicked]);

  console.log(markedArr);
  return (
    <div className="question">
      {question && question.questionText ? (
        <>
          <h4>{question && question.questionText}</h4>
          <p>
            {options &&
              options.map((op, i) => {
                return (
                  <React.Fragment key={op}>
                    <label className="container">
                      {type === "checkbox" ? (
                        <input
                          name="answer"
                          type={type}
                          id={op}
                          value={op}
                          checked={markedArr && markedArr.includes(i)}
                          onChange={() => handleOnChange(i)}
                        ></input>
                      ) : (
                        <input
                          name="answer"
                          type={type}
                          id={op}
                          value={op}
                          checked={i === marked}
                          onChange={() => handleOnChange(i)}
                        ></input>
                      )}
                      {op}
                      <span className={type}></span>
                    </label>
                    <br />
                  </React.Fragment>
                );
              })}
          </p>
        </>
      ) : (
        <h2>LOADING</h2>
      )}
    </div>
  );
}

export default Question;
