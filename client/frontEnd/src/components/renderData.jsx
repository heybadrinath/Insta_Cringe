import React from "react";
import { useEffect, useState } from "react";
function RenderData() {
  let [data, setData] = useState(null);
  const apiLink = "https://badri-squad51-insta-cringe.onrender.com/getBio";

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(apiLink);
      const responseData = await response.json();
      setData(responseData);
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="profiles">
      {data &&
        data.map((item, index) => (
          <div key={index} className="itemBox">
            <h1>{item.UserName}</h1>
            <p>{item.Bio}</p>
          </div>
        ))}
    </div>
  );
}

export default RenderData;
