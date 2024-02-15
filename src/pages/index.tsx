import React from "react";
import useUsers from "../hooks/useUsers";
import UserListItem from "../components/UserListItem";
import { NavBar } from "@/components/NavBar";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Users = () => {
  const { users, isLoading } = useUsers();

  return (
    <>
      <NavBar activePage="/" />
      <div className="text-center text-4xl pt-8">Registered Users</div>
      <div className="text text-sm text-center text-gray-400 max-w-[600px] mx-auto mt-2 mb-8">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Necessitatibus, odio quos voluptas dolore provident hic porro sed alias
        est voluptatibus
      </div>
      {!isLoading ? (
        <div className="relative overflow-x-auto border border-gray-200 m-4 max-w-[1400px] mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Country/ City
                </th>
                <th scope="col" className="px-6 py-3">
                  Street Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Postal Code / Region
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {(users ?? []).map((user) => (
                <UserListItem {...user} key={user.id} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border border-gray-200 m-4 max-w-[1400px] h-[200px] mx-auto flex flex-col justify-center items-center">
          <div className="text-center text-md pb-4">
            Loading Registered Users....
          </div>
          <LoadingSpinner size="lg" />
        </div>
      )}
    </>
  );
};

export default Users;
