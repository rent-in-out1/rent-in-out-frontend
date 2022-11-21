import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import SingleUser from "./singleUser";
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
    <h1>Users list</h1>
    <div className="flex justify-center">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>email</th>
            <th>location</th>
            <th>age</th>
            <th>phone</th>
            <th>Created at</th>
            <th>Status</th>
            <th>Role</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => <SingleUser item={user}/>)}
        </tbody>
      </table>
    </div>

  </Wrapper>
  );
};

export default Users;