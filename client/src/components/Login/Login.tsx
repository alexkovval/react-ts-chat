import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

import { useDispatch } from 'react-redux';
import { changeIsLogged } from '../../redux/Auth';
import { token } from '../../redux/Auth';
import socket from '../../socket/socket';

export const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = (e: React.ChangeEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(changeIsLogged(true));
        //POST => get token
        fetch('http://localhost:5000/users/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then((user) => {
                debugger
                dispatch(token(user.candidate.token));
                localStorage.setItem('jwt', user.candidate.token)
                localStorage.setItem('user', JSON.stringify(user.candidate))
                socket.connect();
                socket.emit('enter', user);
                navigate('/chat');
            });
    };

    return (<div>
        <form className={styles.from} onSubmit={() => handleSubmit}>
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
