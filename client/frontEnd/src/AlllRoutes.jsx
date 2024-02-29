import React from "react";
import { Route, Routes } from "react-router-dom";
import FirstEntity from "./components/firstEntity";
import InputForm from "./components/InputForm";
import RenderData from "./components/renderData";
function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/dummy" element={<FirstEntity />}></Route>
        <Route path="/post" element={<InputForm />}></Route>
        <Route path="/get" element={<RenderData />}></Route>

      </Routes>
    </>
  );
}

export default AllRoutes;