import axios from "axios";
const baseUrl = "/api/users";

const getUser = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const getAllUsers = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
}

export default { getUser, getAllUsers };
