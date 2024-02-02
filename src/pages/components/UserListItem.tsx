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
  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg p-3">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          Name: {user.firstName + " " + user.lastName}
        </div>
        <p className="text-gray-700 text-base pt-2">Email : {user.email}</p>
        <p className="text-gray-700 text-base pt-2">Country : {user.country}</p>
        <p className="text-gray-700 text-base pt-2">City : {user.city}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {user.region}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {user.streetAddress}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {user.postalCode}
        </span>
      </div>
    </div>
  );
};

export default UserListItem;
