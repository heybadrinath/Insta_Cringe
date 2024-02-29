import { useEffect, useState } from "react";
import "./App.css";
import AllRoutes from "./AlllRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="home">
          <h1>Welcome To Insta Cringe</h1>
          <p>
            Discover the ultimate collection of cringe-worthy Instagram bios all
            in one place. From the hilariously awkward to the downright bizarre,
            we've got it covered. Scroll through our curated list and prepare to
            laugh, cringe, and maybe even find some inspiration for your own
            bio. Join us in celebrating the quirks and eccentricities of
            Instagram bios on InstaCringeBio!
          </p>
        </div>
        <AllRoutes />

      </BrowserRouter>
    </>
  );
}

export default App;
