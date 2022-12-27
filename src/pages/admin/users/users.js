import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/axios-service/axios-service";
import { Wrapper } from "../../../assets/styles/wrappers/table";
import SingleUser from "./singleUser";
import Controllers from "../../../shared/components/controllers/controllers";
import PageNav from "../../../shared/UI/page-nav/page-nav";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [option, setOption] = useState("role");
  const [page, setPage] = useState(1);
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
    let url = `/users/userSearch/?s=${search}&sort=${option}&page=${page}`;
    let { data } = await doGetApiMethod(url);
    setUsers(data);
    setIsChange(false);
  };

  return (
    <Wrapper className="border">
      <Controllers
        title={"users list"}
        options={options}
        setSearch={setSearch}
        setOption={setOption}
      />
      <PageNav
        urlPageApi={"/users/countUsers"}
        perPage={10}
        setPage={setPage}
        page={page}
        setIsChange={setIsChange}
        cssClass="flex justify-center justify-between p-3 items-center justify-center w-10/12 md:w-8/12 mx-auto"
      />

      <div className="wrapper">
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
            <tbody id="tbody">
              {users.length > 0 &&
                users?.map((user) => {
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
      </div>
    </Wrapper>
  );
};

export default Users;
