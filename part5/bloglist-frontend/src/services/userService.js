import axios from 'axios'
const baseUrl = '/api/users'

const getUser = async (id) => {
  console.log('id : ', id);
  console.log('`${baseUrl}/${id}` : ', `${baseUrl}/${id}`);
  const request = await axios.get(`${baseUrl}/${id}`)
  console.log('request : ', request);
  return request.data
}

export default { getUser }