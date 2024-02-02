import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

type RegisterUserSchema = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  region: string;
  streetAddress: string;
  postalCode: number;
};

export default function useCreateUser() {
  const queryClient = useQueryClient();
  const { isSuccess, mutate } = useMutation({
    mutationFn: async (user: RegisterUserSchema) => {
      return await axios.post("/api/users", user).then((res) => res.data);
    },
    onMutate: (newUser) => {
      const oldUsers = queryClient.getQueryData("users");

      if (queryClient.getQueryData("users")) {
        queryClient.setQueryData("users", (old: any) => [...old, newUser]);
      }

      return () => queryClient.setQueryData("users", oldUsers);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries("users");
    },
  });

  return {
    createUser: mutate,
    isSuccess,
  };
}
