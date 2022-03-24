import React, { Component, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";

export default function AddJourney() {
  let navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);

      setPreview(url);
    }
    // console.log(form);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("description", form.description);

      // console.log(form);

      const response = await API.post("/blog", formData, config);
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="add-journey">
        <div className="my-5">
          <h2 className="fw-bold">New Journey</h2>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title" className="mb-3">
            <Form.Label className="fw-bolder fs-4">Title</Form.Label>
            <Form.Control type="text" onChange={handleChange} name="title" />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label
              className="bg-primary  rounded p-3 text-white"
              style={{ cursor: "pointer" }}
            >
              Upload Thumbnail
            </Form.Label>
            <Form.Control
              type="file"
              hidden
              onChange={handleChange}
              name="image"
            />
          </Form.Group>
          {preview && (
            <img src={preview} className="mx-3" width="20%" height="20%" />
          )}

          <div className="jorney-editor-text">
            <CKEditor
              editor={ClassicEditor}
              data={form.description}
              onChange={(e, editor) => {
                const data = editor.getData();
                setForm({ description: data });
              }}
            />
          </div>

          <div className="float-end mt-4">
            <Button type="submit" variant="primary" size="lg">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
