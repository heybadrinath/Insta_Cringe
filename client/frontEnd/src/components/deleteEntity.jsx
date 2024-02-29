import React, { useState } from "react";
import axios from "axios";

function DeleteEntity() {
  const apiLink = "https://badri-squad51-insta-cringe.onrender.com/delete";
  const [userId, setUserId] = useState("");
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);

  const erase = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.delete(`${apiLink}/${userId}`);
      console.log(res);
      setRes(res);
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  };

  return (
    <div className="delete">
      <form onSubmit={erase}>
        <p>Enter the User Id to delete</p>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <br />
        <br />
        <button>Delete</button>
      </form>
      {res && (
        <div>
          <p>API Response: {res.data.message}</p>

        </div>
      )}

      {err && (
        <div>
          <p>Error occurred: {err.response.data.message}</p>
         
        </div>
      )}
    </div>
  );
}

export default DeleteEntity;
