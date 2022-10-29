import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Header({ token, setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          // Authorize from backend
          await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error.response.status === 401) {
            // remove token
            localStorage.removeItem("token");
            setToken(null);
            navigate.push("/");
          }
        }
      }
    })();
  }, [token, navigate, setToken]);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <nav bg="light" expand="lg">
      <div>
        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
    </nav>
  );
}

export default Header;