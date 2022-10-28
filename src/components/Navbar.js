import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SearchMovie from "../Core/SearchMovie";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { Tooltip, Button, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

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
      <Grid container spacing={2} className="gridbar">
        <Grid item xs={3}>
          <StyledLink to="/">
            <h1 className="logopage">Movielist</h1>
          </StyledLink>
        </Grid>
        <Grid item xs={6}>
          <SearchMovie />
        </Grid>
        {!token ? (
          <>
            <Grid item xs={3}>
              <StyledLink to="login">
                <Button variant="outlined" sx={{ borderRadius: 20, border: "2px solid", marginTop: "25px", marginRight: "15px" }}>
                  Log In
                </Button>
              </StyledLink>
              <StyledLink to="register">
                <Button variant="contained" sx={{ borderRadius: 20, marginTop: "25px" }}>
                  Register
                </Button>
              </StyledLink>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={3} sx={{ marginTop: "25px" }}>
              <Tooltip title="Account">
                <Button style={{ color: "#dc143c", fontFamily: "roboto" }} id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                  <strong>
                    <AccountCircleRoundedIcon fontSize="large" style={{ color: "#DC143C", fontWeight: "bold" }} />
                  </strong>
                </Button>
              </Tooltip>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <AccountCircleRoundedIcon style={{ color: "#DC143C", fontSize: "large" }} />
                  {"Profile"}
                </MenuItem>
              </Menu>
              <Tooltip title="Settings">
                <Button style={{ color: "#dc143c", fontFamily: "roboto" }}>
                  <strong>
                    <SettingsIcon fontSize="large" style={{ color: "#DC143C", fontWeight: "bold" }} />
                  </strong>
                </Button>
              </Tooltip>
              <Tooltip title="Log Out">
                <Button style={{ color: "#dc143c", fontFamily: "roboto" }}>
                  <LogoutIcon fontSize="large" style={{ color: "#DC143C", fontWeight: "bold" }} onClick={handleLogout} />
                </Button>
              </Tooltip>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}

export default NavbarMenu;