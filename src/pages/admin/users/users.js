import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import SingleUser from "./singleUser";
import Controllers from "../../../components/controllers/controllers";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [option, setOption] = useState();
  const [isChange, setIsChange] = useState(false);
  const options =
    [{ name: "name", value: "fullName.firstName" },
    { name: "status", value: "active" },
    { name: "role", value: "role" }]
  useEffect(() => {
    getAllUsers();
    console.log(search)
  }, [isChange,option,search]);

  const getAllUsers = async () => {
    let url = `/users/search/?s=${search}&sort=${option}`;
    const { data } = await doGetApiMethod(url);
    setUsers(data);
    setIsChange(false)
  };
  return (
    <Wrapper>
      <Controllers title={"users list"} options={options} setSearch={setSearch} setOption={setOption} />
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
            {users.map((user) => <SingleUser key={user._id} item={user} setIsChange={setIsChange} />)}
          </tbody>
        </table>
      </div>

    </Wrapper>
  );
};

export default Users;