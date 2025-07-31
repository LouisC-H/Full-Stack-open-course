import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  request.then(console.log('request : ', request))
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  console.log('response : ', response);
  return response.data;
};

const incrementLikes = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const idURL = baseUrl+`/${id}`
  const oldBlogResponse = await axios.get(idURL)
  const oldBlog = oldBlogResponse.data
  const newBlog = {
    ...oldBlog,
    likes: oldBlog.likes + 1
  }
  const response = await axios.put(idURL, newBlog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${id}`;

  const response = await axios.delete(url, config);
  return response.data;
};

export default { getAll, create, incrementLikes, remove, setToken };
