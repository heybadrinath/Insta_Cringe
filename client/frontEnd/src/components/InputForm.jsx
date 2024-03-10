import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function InputForm() {
  const apiLink = "http://localhost:3000/postBio";
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [UserId, setUserId] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [apiRes, setApiRes] = useState("");
  const [error, setError] = useState("");
  const [apiData, setApiData] = useState({});

  const handleSelectChange = (e) => {
    setCreatedBy(e.target.value);
  };
  const postRequest = (e) => {
    e.preventDefault();
    setError("");
    setApiRes("");
    axios
      .post(apiLink, {
        UserName: userName,
        Bio: userBio,
        UserId: UserId,
        createdBy: createdBy,
      })
      .then((res) => {
        console.log(res);
        setApiRes("Data added successfully");
        setApiData(res.data.value);
        setUserName("");
        setUserBio("");
        setUserId("");
        setCreatedBy("");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.details[0].message);
          setError("Error: " + err.response.data.details[0].message);
        } else if (err.request) {
          console.log(err.request);
          setError("Error: No response received from the server.");
        } else {
          console.log("Error", err.data[0].data);
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
          value={UserId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <div className="select">
          <select onChange={handleSelectChange}>
            <option value="">Select Creator</option>
            <option value="badri">Badri</option>
            <option value="monesh">Monesh</option>
            <option value="shashwath">Shashwath</option>
            <option value="kishore">Kishore</option>
          </select>
        </div>
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
      </form>

      {apiData.UserId && (
        <div className="result">
          <p>User-Id: {apiData.UserId}</p>
          <p>User Name: {apiData.UserName}</p>
          <p>Bio: {apiData.Bio}</p>
          <p>Creator: {apiData.createdBy}</p>
          <Link to="/get">
            <button>Back To Get</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default InputForm;
