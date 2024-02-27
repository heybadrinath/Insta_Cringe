import { useEffect, useState } from "react";
import "./App.css";
import FirstEntity from "./components/firstEntity";

function App() {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    // const apiLink = "https://badri-squad51-insta-cringe.onrender.com/getBio";
    const apiLink = "http://localhost:3000/getBio";
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
    <div className="home">
      <h1>Welcome To Insta Cringe</h1>
      <p>
        Discover the ultimate collection of cringe-worthy Instagram bios all in
        one place. From the hilariously awkward to the downright bizarre, we've
        got it covered. Scroll through our curated list and prepare to laugh,
        cringe, and maybe even find some inspiration for your own bio. Join us
        in celebrating the quirks and eccentricities of Instagram bios on
        InstaCringeBio!
      </p>
      <div className="profiles">
        {data &&
          data.map((item, index) => (
            <div key={index} className="itemBox">
              <h1>{item.UserName}</h1>
              <p>{item.Bio}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
