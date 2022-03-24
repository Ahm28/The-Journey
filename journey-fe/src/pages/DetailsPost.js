import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import parser from "html-react-parser";
import Moment from "moment";

export default function DetailsPost() {
  let { id } = useParams();
  const [blog, setBlog] = useState();
  document.title = `The Journey | ${blog?.title}`;

  const getBlog = async () => {
    try {
      const response = await API.get("/blog/" + id);
      console.log(response);
      setBlog(response.data.data.dataBlog);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(typeof blog?.description);

  useEffect(() => {
    getBlog();
  }, []);

  // let desc = blog?.description;

  return (
    <div className="container detail-post">
      <div className="d-flex justify-content-between">
        <h3 className="fw-bolder">{blog?.title}</h3>
        <p className="fs-5">{blog?.User.fullname}</p>
      </div>
      <p className="text-primary">
        {Moment(blog?.createdAt).format("DD MMM YYYY")}
      </p>

      <img className="img-fluid rounded-3" src={blog?.image} />

      <div className="mt-5">{blog?.description}</div>
    </div>
  );
}
