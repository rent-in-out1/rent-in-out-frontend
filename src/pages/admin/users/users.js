import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/userAdminPage";
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    let url = "/users/userList";
    const { data } = await doGetApiMethod(url);
    setUsers(data);
  };
  return (
    <Wrapper>
      <h2>All users list</h2>
      <table>
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
      <tbody>
        {users.map((user, index) => {
          return (
            <tr key={index}>
              <td>{user.fullName.firstName}</td>
              <td>{user.fullName.lastName}</td>
              <td>{user.role}</td>
              <td>{[user.active]}</td>
            </tr>
          );
        })}
      </tbody>
      </table>
    </Wrapper>
  );
};

export default Users;
