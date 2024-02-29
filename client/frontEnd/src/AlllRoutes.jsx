import React from "react";
import { Route, Routes } from "react-router-dom";
import FirstEntity from "./components/firstEntity";
import InputForm from "./components/InputForm";
import RenderData from "./components/renderData";
import EditEntity from "./components/editEntity";
import DeleteEntity from "./components/deleteEntity";
function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/dummy" element={<FirstEntity />}></Route>
        <Route path="/post" element={<InputForm />}></Route>
        <Route path="/get" element={<RenderData />}></Route>
        <Route path="/edit" element={<EditEntity />}></Route>
        <Route path="/delete" element={<DeleteEntity />}></Route>

      </Routes>
    </>
  );
}

export default AllRoutes;