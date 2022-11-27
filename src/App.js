import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loggedUsername, setLoggedUsername] = useState("");
  const [loggedEmail, setLoggedEmail] = useState("");

  const API = "http://localhost:3000";

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API}/api/v1/users`, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    setUsername("");
    setEmail("");
    setPassword("");
  };

  const submitLogin = (e) => {
    e.preventDefault();
    fetch(`${API}/api/v1/login`, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: loginUsername,
          password: loginPassword,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => localStorage.setItem("token", data.jwt));

    setLoginUsername("");
    setLoginPassword("");
  };

  const getProfile = () => {
    fetch(`${API}/api/v1/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoggedUsername(data.user.username);
        setLoggedEmail(data.user.email);
      });
  };

  return (
    <div className="App">
      <h1>Create new user</h1>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>

      <h1>LOgin</h1>

      <form>
        <label>
          Username:
          <input
            type="text"
            name="name"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="text"
            name="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </label>
        <button onClick={submitLogin}>Submit</button>
      </form>

      <hr />

      {!loggedUsername ? (
        <button onClick={getProfile}>Get Profile</button>
      ) : (
        <>
          <h1>{loggedUsername}</h1>
          <h1>{loggedEmail}</h1>
          <button onClick={localStorage.clear}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;
