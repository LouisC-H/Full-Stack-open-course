import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const NewBlogForm = () => {
  const dispatch = useDispatch()
  const userSelector = useSelector(state => state.user);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleURLChange = (event) => {
    setURL(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog({
      title: title,
      author: author,
      url: url,
      user: userSelector.user,
    }));
    dispatch(setNotification(`New blog "${title}" added.`, false, 5));
    setTitle("");
    setAuthor("");
    setURL("");
  };

  return (
    <form onSubmit={addBlog}>
      <p>
        Title:
        <input
          value={title}
          onChange={handleTitleChange}
          data-testid="titleInput"
          id="titleInput"
        />
      </p>
      <p>
        Author:
        <input
          value={author}
          onChange={handleAuthorChange}
          data-testid="authorInput"
          id="authorInput"
        />
      </p>
      <p>
        URL:
        <input
          value={url}
          onChange={handleURLChange}
          data-testid="urlInput"
          id="urlInput"
        />
      </p>
      <p>
        <button type="submit">save</button>
      </p>
    </form>
  );
};

export default NewBlogForm;
