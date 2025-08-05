import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <tr data-testid="blog">
      <td className="baseInfo">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
      </td>
    </tr>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
