import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
interface Register {}

export const Register: FC<Register> = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      fetch("http://localhost:5000/users/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      //dispatch(changeIsLogged(true));
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.login}>
        <label>User Name</label>
        <input
          className={styles.input}
          required
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Email</label>
        <input
          className={styles.input}
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className={styles.input}
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit">
          Sign in
        </button>
      </div>
    </form>
  );
};
