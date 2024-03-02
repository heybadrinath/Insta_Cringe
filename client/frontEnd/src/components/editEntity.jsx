import React from "react";
import { useState } from "react";
import axios from "axios";
function EditEntity() {
  const apiLink = "http://localhost:3000/putBio";
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userId, setUserId] = useState("");
  const [apiRes, setApiRes] = useState(null);
  const [err, setErr] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiRes(null); // Reset apiRes state
    setErr(""); // Reset err state
    try {
      const response = await axios.patch(`${apiLink}/${userId}`, {
        UserName: userName,
        Bio: userBio,
      });
      console.log(response.data);
      setApiRes(response.data);
    } catch (error) {
      console.log("Error updating user:", error.response.data.message);
      setErr(error.response.data.message);
    }
  };

  return (
    <div className="edit">
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
      {apiRes && <p style={{ color: "green" }}>{apiRes.message}</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}
      {apiRes && (
        <div>
          {apiRes && <p>User Name: {apiRes.profile.UserName}</p>}
          {apiRes && <p>User Bio: {apiRes.profile.Bio}</p>}
        </div>
      )}
    </div>
  );
}

export default EditEntity;
