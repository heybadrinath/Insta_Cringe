import React, { useState } from "react";

function LoginPage() {
  let [userName, setUserName] = useState("");

  const login = () => {
    
  };
  return (
    <div>
      <div className="loginBox">
        <input
          type="text"
          placeholder="Enter the user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
