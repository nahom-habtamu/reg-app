import React from "react";
import useUsers from "../hooks/useUsers";
import UserListItem from "../components/UserListItem";

const Users = () => {
  const { data: users, isLoading } = useUsers();

  return (
    <div className="flex flex-wrap">
      {isLoading ? (
        <div className="w-11 h-11 flex items-center">
          <div className="text-lg text-gray-600">Loading....</div>
        </div>
      ) : (
        <>
          {(users ?? []).map((user) => (
            <UserListItem {...user} key={user.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Users;
