import React, { useContext } from "react";
import { UserContext } from "../components/context/userContext";
import Heroes from "../components/Heroes";
import Journey from "../components/Journey";
import NavbarComponent from "../components/NavbarComponent";

export default function Home() {
  document.title = "The Journey";
  const [state, dispatch] = useContext(UserContext);
  console.log(state.isLogin);

  return (
    <div>
      {localStorage.token ? "" : <Heroes />}
      <Journey />
    </div>
  );
}
