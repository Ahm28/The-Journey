import React, { useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import { API } from "../../config/api";

export default function RegsiterModal(props) {
  const [message, setMessage] = useState();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });

  const { fullname, email, password, phone } = form;

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

      const response = await API.post("/register", body, config);

      if (response.data.status == "Success Add User") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success Register
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Email has Declared
          </Alert>
        );
        setMessage(alert);
      }

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Please try another email
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
          <h4 className="d-flex justify-content-center fw-bold my-4">
            Register
          </h4>

          <Form onSubmit={handleSubmit}>
            {message && message}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold" htmlFor="fullname">
                Full Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Name"
                variant="none"
                name="fullname"
                value={fullname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold" htmlFor="email">
                Email
              </Form.Label>

              <Form.Control
                type="email"
                placeholder="Email"
                variant="none"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold" htmlFor="password">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder="Pasword"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold" htmlFor="phone">
                Phone Number
              </Form.Label>
              <Form.Control
                type="number"
                id="phone"
                name="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <button className="btn btn-primary mb-3">Register</button>
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
