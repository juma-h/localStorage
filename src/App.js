import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  //useEffect
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //   }
  // }, []);

  // logout the user
  const handleLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
  };


  //login function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, password };

    // send the username and password to the server
    const response = await axios.post(
      "http://blogservice.herokuapp.com/api/login",
      user
    );

    // set the state of the user
    setUser(response.data);
    // store the user in localStorage
    localStorage.setItem("user", response.data);
    console.log(response.data);
  };

  // if there's a user show the message below
  if (user) {
    return <div className="log-in">
      {user.username} is loggged in!
      <button onClick={handleLogout}>logout</button>
    </div>;
  }

  return (
    <div className="container-fluid">
      <div className="row landingPage">
        <div className="col-5 left d-flex flex-column justify-content-center align-items-center">
          <span>
            <p>
              <b>localStorage Test</b>
            </p>
          </span>
        </div>

        <div className="col-7 right d-flex flex-column justify-content-center align-items-center">
          <div className="right_inner-cont d-flex flex-column  m-5  p-5">
            <h3 className="mb-3">localStorage Test</h3>

            <form onSubmit={handleSubmit} className="form-for-example">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Username
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={username}
                  placeholder="enter a username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>

              <div>
                <label htmlFor="password">password: </label>
                <input
                  class="form-control"
                  id="exampleFormControlInput1"
                  type="password"
                  value={password}
                  placeholder="enter a password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button type="submit" class="btn btn-primary mt-3">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
