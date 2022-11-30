import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import SingleUser from "./singleUser";
import Controllers from "../../../components/controllers/controllers";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [option, setOption] = useState();
  //lazy loading users
  
  const [isChange, setIsChange] = useState(false);
  const options = [
    { name: "Role", value: "role" },
    { name: "Name", value: "fullName.firstName" },
    { name: "Status", value: "active" },
    { name: "Country", value: "country" },
    { name: "City", value: "city" },
  ];
  useEffect(() => {
    getAllUsers();
  }, [isChange, option, search]);

  const getAllUsers = async () => {
    let url = `/users/search/?s=${search}&sort=${option}`;
    let {data} = await doGetApiMethod(url);
    setUsers(data);
    setIsChange(false);
  };
  return (
    <Wrapper>
      <Controllers
        title={"users list"}
        options={options}
        setSearch={setSearch}
        setOption={setOption}
      />
      <div className="flex justify-center">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>country</th>
              <th>city</th>
              <th>age</th>
              <th>phone</th>
              <th>Created at</th>
              <th>Status</th>
              <th>Role</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 && users?.map((user) => {
              return (
                <SingleUser
                  key={user._id}
                  item={user}
                  setIsChange={setIsChange}
                />
              );
            })}
          </tbody>
        </table>
            {/* {endScreen && <h3>loading...</h3>} */}
      </div>
    </Wrapper>
  );
};

export default Users;
