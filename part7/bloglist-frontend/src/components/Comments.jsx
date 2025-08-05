import { useState } from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../reducers/blogReducer";

const Comments = ({ commentsList, blogID }) => {
  const dispatch = useDispatch()
  const [protoComment, setProtoComment] = useState("");

  const handlePCommentChange = (event) => {
    setProtoComment(event.target.value);
  };

  const sendComment = (event) => {
    event.preventDefault();
    dispatch(postComment(protoComment, blogID));
    setProtoComment("");
  }

    if (commentsList.length === 0) {
    commentsList = ["No comments yet"];
  }

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={sendComment}>
        <input 
        value={protoComment} 
        onChange={handlePCommentChange}
        id="commentInput"></input>
        <button type="submit">add comment</button>
      </form>
      {commentsList.map((comment) => (
        <ul key={comment}>
          <li>{comment}</li>
        </ul>
      ))}
    </div>
  );
};
export default Comments;
