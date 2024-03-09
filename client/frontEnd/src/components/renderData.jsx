import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function RenderData() {
  const apiLink = "https://badri-squad51-insta-cringe.onrender.com/getBio";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiLink);
      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (userId) => {
    console.log("Edit UserId:", userId);
    navigate(`/edit/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const apiLink = "http://localhost:3000/delete";

      const res = await axios.delete(`${apiLink}/${userId}`);
      console.log("Delete Response:", res);
      console.log("Delete UserId:", userId);
      fetchData();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <>
      {loading && <div className="progress-6"></div>}

      <div className="profiles">
        {!loading &&
          data &&
          data.map((item, index) => (
            <div key={index} className="itemBox">
              <h1>{item.UserName}</h1>
              <p>{item.Bio}</p>
              <button onClick={() => handleEdit(item.UserId)}>Edit</button>
              <button onClick={() => handleDelete(item.UserId)}>Delete</button>
            </div>
          ))}
      </div>
    </>
  );
}

export default RenderData;
