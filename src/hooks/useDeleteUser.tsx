import axios, { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

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
      toast("User Deleted Sucessfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
        style: {
          color: "green",
          marginTop: "-15px",
        },
      });
      queryClient.invalidateQueries("users");
    },

    onError: (error) => {
      let errorMessage = "Deleting user failed!!";
      if (isAxiosError(error)) {
        errorMessage = error.response?.data.message ?? errorMessage;
      }
      toast(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
        style: {
          color: "red",
          marginTop: "-15px",
        },
      });
    },
  });

  return {
    deleteUser,
    isLoading,
    isSuccess,
  };
}
