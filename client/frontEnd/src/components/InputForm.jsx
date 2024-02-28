import React, { useState } from "react";
import axios from "axios";

function InputForm() {
  const apiLink = "https://badri-squad51-insta-cringe.onrender.com/postBio";
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userId, setUserId] = useState(0);
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
        setApiData(res.data)
        setUserName("");
        setUserBio("");
        setUserId("");
      })
      .catch((err) => {
        console.log(err);
        setError("Error adding data. Please try again.");
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
        {apiData && <p>User-Id: {apiData.profile.userId}</p>}
        {apiData && <p>User Name: {apiData.profile.UserName}</p>}
        {apiData && <p>Bio: {apiData.profile.Bio}</p>}

      </form>
    </div>
  );
}

export default InputForm;
