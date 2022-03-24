import React, { useContext, useState } from "react";
import { UserContext } from "../components/context/userContext";

import JourneyById from "../components/JourneyById";

export default function Profile() {
  const [profile, setProfile] = useState();
  const [state, dispatch] = useContext(UserContext);

  console.log(state);

  document.title = `The Journey | `;

  return (
    <div className="profile container">
      <div className="d-flex justify-content-center text-center">
        <div>
          <img src="./assets/profile.jpg" className="rounded-pill mb-3" />

          <h3 className="fw-bold ">{state.user.fullname}</h3>
          <p className="text-muted text-align">{state.user.email}</p>
        </div>
      </div>

      <JourneyById />
    </div>
  );
}
