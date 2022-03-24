import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
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

export default function JourneyById() {
  const [blogs, setBlogs] = useState();
  const [bookmark, setBookmark] = useState(false);

  const getBlogs = async () => {
    try {
      const response = await API.get("/blog");
      console.log(response.data.data.dataBlogs);
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
          <h2 className="fw-bold">Your Journey</h2>
        </div>

        <Row>
          {blogs?.map((item, index) => (
            <BlogCards item={item} key={index} />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export const BlogCards = ({ item }) => {
  const [state, dispatch] = useContext(UserContext);

  console.log(item.User.id);
  console.log(state.user.id);

  return (
    <Col md={3} className="mb-3">
      <Card>
        <Card.Img variant="top" src={item.image} />
        <div
          className="bookmark"
          // onClick={() => handleClick()}
          style={{ cursor: "pointer" }}
        >
          {/* {bookmark ? <BsBookmarkFill /> : <BsBookmark />} */}
        </div>
        <Card.Body>
          <Link to={`/detail-post/${item.id}`} className="text-decoration-none">
            <Card.Title className="fw-bold mb-2 text-link">
              {item.title}
            </Card.Title>
          </Link>
          <Card.Text>
            {item.User.id == state.user.id ? (
              <div className="float-end">
                <span>
                  <BsTrash />
                </span>
                <span>
                  <BsPencilFill />
                </span>
              </div>
            ) : (
              ""
            )}
          </Card.Text>

          <Card.Text className="text-muted fs-6 mb-3">
            {Moment(item.createdAt).format("DD MMM YYYY")}, {item.User.fullname}
          </Card.Text>
          {parser(item.description.slice(0, 100))}
        </Card.Body>
      </Card>
    </Col>
  );
};
