import { useEffect, useState } from "react";
import userService from "../services/userService";

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
          <tr>
            <td>user1</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Users;