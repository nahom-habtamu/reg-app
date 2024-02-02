import axios from "axios";
import { useQuery } from "react-query";

type User = {
  id: Key | null | undefined;
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
  return useQuery("users", () =>
    axios.get<User[]>("/api/users").then((res) => res.data)
  );
}
