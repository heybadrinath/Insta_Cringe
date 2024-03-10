import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RenderData() {
  const apiLink = "https://badri-squad51-insta-cringe.onrender.com/getBio";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCreator, setSelectedCreator] = useState("");
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
      const apiLink = "https://badri-squad51-insta-cringe.onrender.com/delete";

      console.log("Delete UserId:", userId);
      const res = await axios.delete(`${apiLink}/${userId}`);
      console.log("Delete Response:", res);

      fetchData();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedCreator(e.target.value);
  };

  const filteredData = selectedCreator
    ? data.filter((item) => item.createdBy === selectedCreator)
    : data;

  return (
    <>
      {loading && <div className="progress-6"></div>}

      <div className="select-wrapper">
        <select onChange={handleSelectChange}>
          <option value="">All Creators</option>
          <option value="badri">Badri</option>
          <option value="monesh">Monesh</option>
          <option value="shashwath">Shashwath</option>
          <option value="kishore">Kishore</option>
        </select>
      </div>

      <div className="profiles">
        {!loading &&
          filteredData &&
          filteredData.map((item, index) => (
            <div key={index} className="itemBox">
              <h1>{item.UserName}</h1>
              <p>{item.Bio}</p>
              <h6>Created-By: {item.createdBy}</h6>
              <button className="button-55" onClick={() => handleEdit(item.UserId)}>Edit</button>
              <button className="button-55" onClick={() => handleDelete(item.UserId)}>Delete</button>
            </div>
          ))}
      </div>
    </>
  );
}

export default RenderData;
