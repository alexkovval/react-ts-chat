import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import socket from "../../socket/socket";

import styles from "./Login.module.css";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //POST => get token
    fetch("http://localhost:5000/users/login", {
      //TODO : .env (links)
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((user) => {
        localStorage.setItem("jwt", user.candidate.token);
        localStorage.setItem("user", JSON.stringify(user.candidate));
        //TODO : localstorage,sessionstorage ? coockie=jwt
        socket.connect();
        socket.emit("enter", user);
        navigate("/chat");
      });
  };

  return (
    <div>
      <form className={styles.from} onSubmit={handleSubmit}>
        <div className={styles.login}>
          <label>Username</label>
          <input
            className={styles.input}
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            className={styles.input}
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.button} type="submit">
            Login
          </button>
          <h4>
            If you are not registered,
            <br /> please sign first!
          </h4>
          <button className={styles.button}>
            <Link to="/register">Register</Link>
          </button>
        </div>
      </form>
    </div>
  );
};
