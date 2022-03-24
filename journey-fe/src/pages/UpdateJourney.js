import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";

export default function UpdateJourney() {
  let navigate = useNavigate();
  let { id } = useParams();

  const [blog, setBlog] = useState({});
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
  });

  const getBlog = async (id) => {
    try {
      const response = await API.get("/blog/" + id);

      setBlog(response.data.data.dataBlog);

      setPreview(response.data.data.dataBlog.image);

      setForm({
        title: response.data.data.dataBlog.title,
        description: response.data.data.dataBlog.description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
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
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0].name);
      }
      formData.set("title", form.title);
      formData.set("description", form.description);

      const response = await API.patch("/blog/" + blog.id, formData, config);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(blog);

  useEffect(() => {
    getBlog(id);
  }, []);

  return (
    <Container>
      <div className="add-journey">
        <div className="my-5">
          <h2 className="fw-bold">New Journey</h2>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title" className="mb-3">
            <Form.Label className="fw-bolder fs-4">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <input
              type="file"
              id="upload"
              name="image"
              hidden
              onChange={handleChange}
            />
            <label
              for="upload"
              className="bg-primary  rounded p-3 text-white"
              style={{ cursor: "pointer" }}
            >
              Upload file
            </label>
          </Form.Group>
          {preview && (
            <img src={preview} className="mb-3" width="20%" height="20%" />
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
