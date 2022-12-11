import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import SingleUser from "./singleUser";
import Controllers from "../../../components/controllers/controllers";
import Loader from "../../../components/loader/loader";
import PageNav from "./../../../helpers/pageNav";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [option, setOption] = useState("role");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    let url = `/users/userSearch/?s=${search}&sort=${option}&page=${page}`;
    let { data } = await doGetApiMethod(url);
    setIsLoading(false);
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
        {!isLoading ? (
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
        ) : (
          <div className="flex justify-center w-full">
            <Loader />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Users;
