import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { API } from "../config/api";
import parser from "html-react-parser";
import moment from "moment";

export default function Bookmark() {
  document.title = "The Journey | Bookmark";
  const [bookmark, setBookmark] = useState();

  const getBookmarks = async () => {
    try {
      const response = await API.get("/bookmark");

      setBookmark(response.data.data.bookmark);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div className="bookmark-page">
      <Container>
        <div className="my-5">
          <h2 className="fw-bold">Bookmark</h2>
        </div>
        <Row>
          {bookmark?.map((item, index) => (
            <Bookmarks item={item} key={index} />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export const Bookmarks = ({ item }) => {
  const handleClick = async (id) => {
    try {
      await API.delete("/bookmark/" + id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Col md={3} className="mb-3">
      <Card>
        <Card.Img variant="top" src={item.blogs.image} />
        <div
          className="bookmark"
          onClick={() => handleClick(item.id)}
          style={{ cursor: "pointer" }}
        >
          {/* <BsBookmark /> */}
          <BsBookmarkFill />
        </div>
        <Card.Body>
          <Link
            to={`/detail-post/${item.blogs.id}`}
            className="text-decoration-none"
          >
            <Card.Title className="fw-bold mb-2">{item.blogs.title}</Card.Title>
          </Link>

          <Card.Text className="text-muted fs-6">
            {moment(item.blogs.createdAt).format("DD MMM YYYY")},{" "}
            {item.blogs.User.fullname}
          </Card.Text>
          <Card.Text>{parser(item.blogs.description.slice(0, 100))}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
