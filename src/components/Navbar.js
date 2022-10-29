import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function NavbarMenu({ token, setToken }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error.response.status === 401) {
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
    <div className="menupage">
      <div container spacing={2} className="divbar">
        <div item xs={3}>
          <Link to="/">
            <h1 className="logopage">MovieList</h1>
          </Link>
        </div>
        {!token ? (
          <>
            <div item xs={3}>
              <Link to="login">
                <button variant="outlined" sx={{ borderRadius: 20, border: "2px solid", marginTop: "25px", marginRight: "15px" }}>
                  Log In
                </button>
              </Link>
              <Link to="register">
                <button variant="contained" sx={{ borderRadius: 20, marginTop: "25px" }}>
                  Register
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div item xs={3} sx={{ marginTop: "25px" }}>      

                <button style={{ color: "#dc143c", fontFamily: "roboto" }} onClick={handleLogout} >
                  Log Out 
                </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NavbarMenu;