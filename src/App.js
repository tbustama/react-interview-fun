import logo from "./logo.svg";
import "./App.css";
import React from "react";

const { useEffect, useState } = React;

function getRandomUsers(pageNumber) {
  return fetch(`https://randomuser.me/api?page=${pageNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(({ results }) => {
      console.log(results);
      return results;
    })
    .catch((err) => console.log(err));
}

const getUserInfo = (userInfo) => {
  const name = userInfo.name;
  const fullName = `${name.title} ${name.first} ${name.last}`;
  return fullName;
};

function App() {
  const [counter, setCounter] = useState(0);
  const [randomUserDataJSON, setRandomUserData] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  const fetchNextUser = () => {
    getRandomUsers(nextPage).then((randomData) => {
      if (randomData == undefined) return;
      const newUserInfos = [...randomUserDataJSON, ...randomData];
      setRandomUserData(newUserInfos || ["Nothing here to see"]);
      setNextPage(nextPage + 1);
    });
  };

  useEffect(() => {
    fetchNextUser();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{counter}</p>
        <button onClick={() => setCounter(counter + 1)}>
          Increase Count
        </button>{" "}
        <br></br>
        <button onClick={fetchNextUser}>Get More Users</button>
        <br></br>
        {randomUserDataJSON.map((userInfo, index) => (
          <>
            <p>{getUserInfo(userInfo)}</p>
            <img src={userInfo.picture.thumbnail} />
          </>
        ))}
        {/* <p> {randomUserDataJSON}</p> */}
      </header>
    </div>
  );
}

export default App;
