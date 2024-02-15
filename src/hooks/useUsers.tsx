import axios from "axios";
import { useQuery } from "react-query";

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

export default function useUsers() {
  const { data: users, isLoading } = useQuery("users", () =>
    axios.get<User[]>("/api/users").then((res) => res.data)
  );

  return {
    users,
    isLoading,
  };
}
