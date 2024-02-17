import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export default function useDeletePost() {
  const queryClient = useQueryClient();
  const {
    isSuccess,
    mutate: deleteUser,
    isLoading,
  } = useMutation({
    mutationFn: async (userId: string) => {
      return await axios.delete(`/api/users/${userId}`).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  return {
    deleteUser,
    isLoading,
    isSuccess,
  };
}
