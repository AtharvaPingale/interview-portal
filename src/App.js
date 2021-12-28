import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Components/Home";
import Test from "./Components/Test";
import Finish from "./Components/Finish";
import NotFound from "./Components/NotFound";

function App() {
  const [post, setPost] = useState(null);
  useEffect(() => {
    axios
      .get("http://interviewapi.stgbuild.com/getQuizData")
      .then((response) => setPost(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home post={post} />} />
          <Route
            path="/AngularJSTest/:id"
            element={<Test data={post && post.tests[0]} />}
          />

          <Route
            path="/JavascriptTest/:id"
            element={<Test data={post && post.tests[1]} />}
          />
          <Route
            path="/NodeJSTest/:id"
            element={<Test data={post && post.tests[2]} />}
          />
          <Route
            path="/Finish"
            element={<Finish data={post && post.tests} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
