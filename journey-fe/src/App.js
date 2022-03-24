import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "./components/context/userContext";
import { API, setAuthToken } from "./config/api";
import AddJourney from "./pages/AddJourney";
import Bookmark from "./pages/Bookmark";
import DetailsPost from "./pages/DetailsPost";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UpdateJourney from "./pages/UpdateJourney";

import "./style/style.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (!state.isLogin) {
      navigate("/");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail-post/:id" element={<DetailsPost />} />
      <Route path="/bookmark" element={<Bookmark />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-journey" element={<AddJourney />} />
      <Route path="/update-journey/:id" element={<UpdateJourney />} />
    </Routes>
  );
}

export default App;
