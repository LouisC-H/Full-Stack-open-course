import { useEffect, useState } from "react";
import userService from "../services/userService";

const SingleUserRow = ({ user }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.blogs.length}</td>
  </tr>
)


const Users = () => {
  const [userList, setUserList] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const userList = await userService.getAllUsers()
      setUserList(userList);
    }
    getUsers();
  }, [])

  console.log('userList : ', userList);

  if (userList) {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th><b>blogs created</b></th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) =>(
              <SingleUserRow
                key = {user.id}
                user = {user}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Users;