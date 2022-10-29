import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function GoogleLogin({ setToken, label }) {
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      // Send access token to backend
      try {
        const data = {
          access_token: response.access_token,
        };
        const result = await axios.post('https://challenge6-backend.herokuapp.com/api/v1/auth/login', data);
        
        if (result.data.token) {
          // Set token from backend to local storage
          // {"data": { "token": "ini token" }}
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
        }
      } catch (error) {
        // If there are any error it will show the error message from backend
        // { "message": "Password salah" }
        alert(error.response.data.message);
      }
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <div className="d-grid">
      <div className="m-auto">
        <button variant="primary" onClick={googleLogin}>
          Google Login
        </button>
      </div>
    </div>
  );
}

export default GoogleLogin;