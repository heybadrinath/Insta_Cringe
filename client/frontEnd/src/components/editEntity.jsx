import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function EditEntity() {
  const apiLink = "http://localhost:3000/putBio";
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userId, setUserId] = useState(id);
  const [apiRes, setApiRes] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    setUserId(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiRes(null);
    setErr("");
    try {
      let requestData = {};
      if (userName.trim() !== "") {
        requestData.UserName = userName;
      }

      if (userBio.trim() !== "") {
        requestData.Bio = userBio;
      }

      if (Object.keys(requestData).length === 0) {
        throw new Error("No fields to update.");
      }
      console.log(requestData);
      const response = await axios.patch(`${apiLink}/${userId}`, requestData);
      console.log(response.data);
      setApiRes(response.data);
    } catch (error) {
      console.log(
        "Error updating user:",
        // error.response ? error.response.data.message : error.message
        error
      );
      setErr(error.response ? error.response.data.message : error.message);
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
          disabled
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
          <p>User Name: {apiRes.UserName}</p>
          <p>User Bio: {apiRes.Bio}</p>
          <Link to="/get">
            <button>Go Back</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default EditEntity;
