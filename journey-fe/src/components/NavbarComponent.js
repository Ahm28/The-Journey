import React, { useContext, useState } from "react";
import { Container, Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../config/api";
import { UserContext } from "./context/userContext";
import LoginModal from "./modal/LoginModal";
import RegsiterModal from "./modal/RegsiterModal";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function NavbarComponent() {
  let navigate = useNavigate();
  const [showModalogin, setShowModalogin] = useState(false);
  const [showModaRegister, setShowModaRegister] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const navbarLogin = () => {
    return (
      <>
        <Dropdown>
          <Dropdown.Toggle variant="none">
            <img
              src="./assets/profile.jpg"
              alt="profile"
              width="50px"
              height="50px"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/profile" className="text-decoration-none mb-1">
                <img src="/assets/user.svg" width="20px" />
                <span className="ms-2 text-primary-color">Profile</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/add-journey" className="text-decoration-none mb-2">
                <img src="/assets/journerLogo.svg" width="20px" />
                <span className="ms-2 text-primary-color">New Journey</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/bookmark" className="text-decoration-none">
                <img src="/assets/bookmark.svg" width="13px" />
                <span className="ms-2 text-primary-color">Bookmark</span>
              </Link>
            </Dropdown.Item>
            <hr />
            <Dropdown.Item href="#" onClick={logout}>
              <img src="/assets/logout.svg" width="20px" />
              <span className="ms-2 text-primary-color">Logout</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  const navbarIsntLogin = () => {
    return (
      <>
        <Button
          onClick={() => setShowModalogin(true)}
          variant="outline-light"
          size="sm"
          className="px-4 me-4"
        >
          Login
        </Button>
        <LoginModal
          show={showModalogin}
          // onClick={() => loginBtn()}
          onHide={() => setShowModalogin(false)}
        />

        <Button
          onClick={() => setShowModaRegister(true)}
          className="px-4"
          size="sm"
        >
          Register
        </Button>
        <RegsiterModal
          show={showModaRegister}
          onHide={() => setShowModaRegister(false)}
        />
      </>
    );
  };

  return (
    <Navbar
      expand="md"
      className="fixed-top"
      bg={localStorage.token ? "light" : "none"}
    >
      <Container>
        <Navbar.Brand className="ms-auto">
          <Link to="/">
            <img
              src={
                localStorage.token
                  ? "./assets/logo-dark.svg"
                  : "./assets/logo.svg"
              }
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {localStorage.token ? navbarLogin() : navbarIsntLogin()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
