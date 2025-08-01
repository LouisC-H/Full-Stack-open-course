import PropTypes from "prop-types";
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} data-testid="blog">
      <div className="baseInfo">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
