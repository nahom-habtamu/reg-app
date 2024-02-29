import axios from "axios";
import { useQuery } from "react-query";

export type User = {
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

export default function useUser(userId: string) {
  const { data: user, isLoading: isFetchingUserLoading } = useQuery<
    User | undefined
  >(
    ["users", userId],
    () => axios.get(`/api/users/${userId}`).then((res) => res.data),
    {
      enabled: userId !== undefined,
    }
  );

  return {
    user,
    isFetchingUserLoading,
  };
}
