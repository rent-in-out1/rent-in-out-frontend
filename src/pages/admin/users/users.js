import React, { useEffect, useState } from "react";
import { doGetApiMethod } from "../../../services/service";
import { Wrapper } from "../../../components/style/wrappers/table";
import SingleUser from "./singleUser";
import Controllers from "../../../components/controllers/controllers";
import { useScroll } from "./../../../hooks/useScroll";
import Loader from "../../../components/loaderImg/loaderImg";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [option, setOption] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //lazy loading users

  const [firstLoad, setFirstLoad] = useState(true);
  const [endScreen, endScreenEnd] = useScroll(900);
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
  }, [isChange, option, search, page]);

  useEffect(() => {
    const count = async () => {
      if (!firstLoad && endScreen) {
        let { data } = await doGetApiMethod("/users/countUsers");
        if (page +1 > (data / 10)) setPage(data / 10)
        else setPage(page + 1);
      }
      setFirstLoad(false);
    }
    count()
  }, [endScreen]);

  const getAllUsers = async () => {
    if (search) {
      setIsLoading(true)
      setPage(1);
      setUsers([])
      let url = `/users/search/?s=${search}&sort=${option}&page=${page}`;
      let { data } = await doGetApiMethod(url);
      setIsLoading(false)
      console.log(page)
      setUsers(data);
    }
    else {
      setIsLoading(true)
      let url = `/users/search/?s=${search}&sort=${option}&page=${page}`;
      let { data } = await doGetApiMethod(url);
      setIsLoading(false)
      setUsers([...users, ...data]);
    }
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
          <tbody id="tbody">
            {users.length > 0 && users?.map((user) => {
              return (
                <SingleUser
                  key={user._id}
                  item={user}
                  setIsChange={setIsChange}
                />
              );
            })}
            {isLoading && <div className="flex justify-center w-full"><Loader/></div>}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Users;
