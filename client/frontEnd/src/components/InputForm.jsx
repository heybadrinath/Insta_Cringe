import React, { useState } from "react";
import axios from "axios";

function InputForm() {
  const apiLink = "https://badri-squad51-insta-cringe.onrender.com/postBio";
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userId, setUserId] = useState("");
  const [apiRes, setApiRes] = useState("");
  const [error, setError] = useState("");
  const [apiData, setApiData] = useState({});
  const postRequest = (e) => {
    e.preventDefault();
    axios
      .post(apiLink, {
        UserName: userName,
        Bio: userBio,
        userId: userId,
      })
      .then((res) => {
        console.log(res.data);
        setApiRes("Data added successfully");
        setApiData(res.data);
        setUserName("");
        setUserBio("");
        setUserId("");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          setError("Error: " + err.response.data);
        } else if (err.request) {
          console.log(err.request);
          setError("Error: No response received from the server.");
        } else {
          console.log("Error", err.message);
          setError("Error: " + err.message);
        }
      });
  };

  return (
    <div className="formDiv">
      <form onSubmit={postRequest}>
        <p>Name:</p>
        <input
          type="text"
          name="name"
          placeholder="Enter the IG User Name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <p>User Id:</p>
        <input
          type="text"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <p>Bio:</p>
        <textarea
          name="bio"
          cols="20"
          rows="5"
          value={userBio}
          placeholder="Enter the IG bio"
          onChange={(e) => {
            setUserBio(e.target.value);
          }}
        ></textarea>
        <br />
        <button>Add to DataBase</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {apiRes && <p style={{ color: "green" }}>{apiRes}</p>}
        {apiData.profile && (
          <div>
            <p>User-Id: {apiData.profile.userId}</p>
            <p>User Name: {apiData.profile.UserName}</p>
            <p>Bio: {apiData.profile.Bio}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default InputForm;
