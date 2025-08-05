import { useEffect, useState } from "react";
import userService from "../services/userService";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleUserRow = ({ user }) => (
  <tr>
    <td>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </td>
    <td>{user.name}</td>
    <td>{user.blogs.length}</td>
  </tr>
);

const Users = () => {
  const userList = useSelector((state) => state.user.userList);

  if (userList) {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>
                <b>blogs created</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <SingleUserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Users;
