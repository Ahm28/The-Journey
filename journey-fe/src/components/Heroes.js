import React from "react";
import { Container } from "react-bootstrap";

export default function Heroes() {
  return (
    <div className="heroes">
      <Container className="heroes-body text-white fw-bold">
        <h2>
          The Journey <br /> you ever dreamed of.
        </h2>
        <p className="w-50 mt-4 fw-light">
          We made a tool so you can easily keep & share your travel memories.
          But there is a lot more
        </p>
      </Container>
    </div>
  );
}
