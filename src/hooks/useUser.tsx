import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

export const fetchUser = (userId: string) =>
  axios.get(`/api/users/${userId}`).then((res) => res.data);

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

export default function useUser(userId: string, enabled: boolean) {
  const queryClient = useQueryClient();
  const { data } = useQuery(["users", userId], () => fetchUser(userId), {
    initialData: () => {
      const fetchedUsers: User[] = queryClient.getQueryData("users") ?? [];
      return fetchedUsers.find((d) => d.id == userId);
    },
    enabled: enabled,
  });

  return {
    user: data as User | undefined,
  };
}
