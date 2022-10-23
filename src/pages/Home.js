import React, { useEffect } from "react";

import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";

import { useDispatch, useSelector } from "react-redux";

import CardBlog from "../components/CardBlog";
import Spinner from "../components/Spinner";
import { getBlogs } from "../redux/features/blogSlice";

const Home = () => {
  const { blogs, loading } = useSelector((state) => ({ ...state.blog }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {blogs.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Blogs Found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {blogs &&
                blogs.map((item, index) => <CardBlog key={index} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
