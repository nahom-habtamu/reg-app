import useDeletePost from "@/hooks/useDeleteUser";
import Link from "next/link";
import { DeleteUserConfirmationModal } from "./DeleteUserConfirmationModal";
import { useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  region: string;
  streetAddress: string;
  postalCode: number;
};

const UserListItem = (user: User) => {
  const {
    city,
    country,
    email,
    firstName,
    id,
    lastName,
    postalCode,
    region,
    streetAddress,
  } = user;

  const { deleteUser, isLoading } = useDeletePost();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <tr className="bg-white border-b">
        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
          {id}
        </th>
        <td className="px-6 py-4">{firstName + " " + lastName}</td>
        <td className="px-6 py-4">{email}</td>
        <td className="px-6 py-4">{country + " / " + city}</td>
        <td className="px-6 py-4">{streetAddress}</td>
        <td className="px-6 py-4">{postalCode + " / " + region}</td>
        <td className="px-6 py-4">
          <Link href={`/edit/${id}`}>
            <button className="rounded-md w-20 h-10 bg-indigo-600 mr-4 px-3 py-2 text-sm font-semibold text-white">
              Edit
            </button>
          </Link>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-md w-20 h-10 bg-red-600 px-3 py-2 text-sm font-semibold text-white"
          >
            Delete
          </button>
        </td>
      </tr>
      <DeleteUserConfirmationModal
        actionLoading={isLoading}
        onAction={() => deleteUser(user.id)}
        onClose={() => setModalOpen(false)}
        show={modalOpen}
      />
    </>
  );
};

export default UserListItem;
