import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  BsBookmark,
  BsBookmarkFill,
  BsTrash,
  BsPencilFill,
} from "react-icons/bs";
import { API } from "../config/api";
import Moment from "moment";
import parser from "html-react-parser";
import { UserContext } from "./context/userContext";

export default function Journey() {
  const [blogs, setBlogs] = useState();
  const [search, setSearch] = useState("");

  const getBlogs = async () => {
    try {
      const response = await API.get("/blogs");
      setBlogs(response.data.data.dataBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="journey">
      <Container>
        <div className="my-5">
          <h2 className="fw-bold">Journey</h2>
        </div>

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            style={{ width: "80%", height: "40px", fontSize: "18px" }}
            // className="my-5 px-3"
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroup.Text id="basic-addon1">&#128269;</InputGroup.Text>
        </InputGroup>

        <Row>
          {blogs
            ?.filter((val) => {
              if (search == "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item, index) => (
              <BlogCards item={item} key={index} />
            ))}
        </Row>
      </Container>
    </div>
  );
}

export const BlogCards = ({ item }) => {
  // let navigate = useNavigate()
  const [isMark, setIsMark] = useState(false);
  const [blogs, setBlogs] = useState();
  const [state, dispatch] = useContext(UserContext);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getBlogs = async () => {
    try {
      const response = await API.get("/blogs");
      setBlogs(response.data.data.dataBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmark = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        idBlogs: item.id,
      };

      const body = JSON.stringify(data);

      await API.post("/bookmark", body, config);

      setIsMark(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteById = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = async (id) => {
    try {
      await API.delete("/blog/" + id);
      getBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <>
      <Col md={3} className="mb-3">
        <Card
          style={{
            maxHeight: "500px",
            height: "500px",
            overflow: "hidden",
          }}
        >
          <Card.Img variant="top" src={item.image} />
          <div
            className="bookmark"
            onClick={() => handleBookmark()}
            style={{ cursor: "pointer" }}
          >
            {isMark ? <BsBookmarkFill /> : <BsBookmark />}
          </div>
          <Card.Body>
            <Card.Text>
              {item.User.id == state.user.id ? (
                <div className="float-end mb-4 ">
                  <span
                    style={{ cursor: "pointer" }}
                    className="text-danger me-2"
                    onClick={() => {
                      handleDeleteById(item.id);
                    }}
                  >
                    <BsTrash />
                  </span>
                  <Link to={`/update-journey/${item.id}`}>
                    <span className="text-success">
                      <BsPencilFill />
                    </span>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </Card.Text>
            <Link
              to={`/detail-post/${item.id}`}
              className="text-decoration-none"
            >
              <Card.Title className="fw-bold mb-2 text-link">
                {item.title}
              </Card.Title>
            </Link>

            <Card.Text className="text-muted fs-6 mb-3">
              {Moment(item.createdAt).format("DD MMM YYYY")},{" "}
              {item.User.fullname}
            </Card.Text>
            <div className="mb-3">{parser(item.description.slice(0, 300))}</div>
          </Card.Body>
        </Card>
      </Col>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
};

export const DeleteData = ({ show, handleClose, setConfirmDelete }) => {
  const handleDelete = () => {
    setConfirmDelete(true);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-dark">
        <div style={{ fontSize: "20px", fontWeight: "900" }}>Delete Data</div>
        <div style={{ fontSize: "16px", fontWeight: "500" }} className="mt-2">
          Are you sure you want to delete this data?
        </div>
        <div className="text-end mt-5">
          <Button
            onClick={handleDelete}
            size="sm"
            className="btn-success me-2"
            style={{ width: "135px" }}
          >
            Yes
          </Button>
          <Button
            onClick={handleClose}
            size="sm"
            className="btn-danger"
            style={{ width: "135px" }}
          >
            No
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
