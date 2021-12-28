import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Home(props) {
  let post = props.post;

  // useEffect(() => {
  //   if (props.post)
  //     for (let i = 0; i < 3; i++) {
  //       if (localStorage.getItem(props.post.tests[i].name))
  //         localStorage.removeItem(props.post.tests[i].name);
  //     }
  // }, [props.post]);

  const tests = () => {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(
        <tr key={i}>
          <td>{post.tests && post.tests[i].name}</td>
          <td>{post.tests && post.tests[i].questions.length}</td>
          <td>
            <Link to={`${post.tests[i].name.replace(/\s/g, "")}/1`}>
              <button>Start test</button>
            </Link>
          </td>
        </tr>
      );
    }
    return arr;
  };

  console.log(post);
  return (
    <>
      <h1>My Interview Portal</h1>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>No of Questions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{post && tests()}</tbody>
      </table>
    </>
  );
}

export default Home;
