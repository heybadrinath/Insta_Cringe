import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

function UserLogin({ login }) {
  const apiLink = "http://localhost:3000/login";
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigation = useNavigate();

  const setUser = async () => {
    if (userName.trim() === "" || password.trim() === "") {
      console.log("no username or password");
      return null;
    }
    try {
      const response = await axios.post(apiLink, {
        userName: userName,
        password: password,
      });
      console.log(response);
      const token = response.data.token; // Get token from response
      Cookies.set("token", token); // Set token in cookies
      setResponseMessage(response.data.message);
      login(token); // Pass token to login function
      navigation("/get"); // Navigate to '/getBio'
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred while processing your request.");
    }
  };

  return (
    <div className="login">
      <input
        type="text"
        placeholder="Enter the username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter the password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>ps. try guest and guest</p>
      <button onClick={setUser}>Login</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default UserLogin;
