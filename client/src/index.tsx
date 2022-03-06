import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { Login } from './components/Login/Login'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { Register } from './components/Register/Register';
import { Rooms } from './components/Rooms/Rooms';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="chat" element={<Rooms />} />
                        <Route path="*" element={<Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);