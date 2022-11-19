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
      <div className="flex justify-center">
        <table className="w-3/4">
          <thead>
            <tr>
              <th
                className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th
                className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                products
              </th>
              <th
                className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Created at
              </th>
              <th
                className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                QRT
              </th>
              <th
                className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img className="w-full h-full rounded-full"
                      src={users[6]?.profile_img}
                      alt="" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {users[2]?.fullName.firstName} {users[2]?.fullName.lastName}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">Admin</p>
              </td>
              <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {users[2]?.craetedAt.split("T")[0]}
                </p>
              </td>
              <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  43
                </p>
              </td>
              <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                  <span aria-hidden
                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                  <span className="relative">{String(users[2]?.active)}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </Wrapper>
  );
};

export default Users;


{/* <tbody>
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
</tbody> */}