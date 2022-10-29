import { useState } from "react";
import './App.css';
import NavbarMenu from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
    const tokenLocalStorage = localStorage.getItem("token");
    const [token, setToken] = useState(tokenLocalStorage);

    return (
                < GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                    <div className="web-movie-app">
                            <NavbarMenu token={token} setToken={setToken} />
                    <Routes>
                            <Route index element={<Home token={token} setToken={setToken} />} />

                            <Route path="/register" element={<Register token={token} setToken={setToken} />} />
                            <Route path="/login" element={<Login token={token} setToken={setToken} />} />
                        
                    </Routes>
                    </div>
                </GoogleOAuthProvider>


    );
}

export default App;