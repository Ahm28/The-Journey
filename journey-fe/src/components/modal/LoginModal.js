import React, { useContext, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../context/userContext";

export default function LoginModal(props) {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);

      if (response?.status == 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
      }

      setForm({
        email: "",
        password: "",
      });
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          gagal
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="modal-image">
        <Modal.Body className="modal-card">
          <h4 className="d-flex justify-content-center fw-bold my-4">Login</h4>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold" htmlFor="email">
                Email
              </Form.Label>
              <Form.Control
                type="email"
                variant="none"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                style={{ color: "black" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold" htmlFor="password">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <button className="btn btn-primary mb-3">Login</button>
            </div>
            <p className="text-muted fs-6">
              Don't have an account ? Klik
              <a>
                <strong> Here</strong>
              </a>
            </p>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
}
