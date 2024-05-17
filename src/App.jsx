import "./App.css";
import "./assets/styles/loadingSpinner.css";
import React from "react";
import { useEffect } from "react";
import DisplayUsers from "./components/displayUsers";
import AddUser from "./components/addUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateUser from "./components/updateUser";
import NotFound from "./components/notFound";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const isUsersFetched = useSelector((state) => state.isUsersFetched);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!isUsersFetched) {
      dispatch({ type: "FETCH_USERS" });
    }
  }, [dispatch, isUsersFetched]);
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path="" element={<DisplayUsers />} />
          <Route path="/users" element={<DisplayUsers />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/update" element={<UpdateUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
