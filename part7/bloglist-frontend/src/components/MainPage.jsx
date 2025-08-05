import { useRef } from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

import Togglable from "../components/Togglable";
import NewBlogForm from "../components/NewBlogForm";
import Blog from "../components/Blog";

const MainPage = () => {
  const blogFormRef = useRef();
  const blogsSelector = useSelector((state) => state.blogs);
  const userSelector = useSelector((state) => state.user);

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h3>Create new blog</h3>
        <NewBlogForm user={userSelector.user} />
      </Togglable>
      <br />
      <Table striped>
        <tbody>
          {blogsSelector.map((blog) => (
            <Blog key={blog.id} blog={blog} user={userSelector.user} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MainPage;
