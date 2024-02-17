import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";
import useUser from "./useUser";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const editUserZodSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  city: z.string().min(1, { message: "City is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  streetAddress: z.string().min(1, { message: "Street Address is required" }),
  postalCode: z.coerce
    .number()
    .gte(999, "Postal code with 4 digits is required"),
});

export type TEditUserSchema = z.infer<typeof editUserZodSchema>;

export default function useEditUser(id: string) {
  const { user, isFetchingUserLoading } = useUser(id);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TEditUserSchema>({
    resolver: zodResolver(editUserZodSchema),
    defaultValues: {},
  });

  const fillDataOnce = useRef<boolean>(true);

  useEffect(() => {
    if (fillDataOnce) {
      fillDataOnce.current = false;
      reset({ ...user });
    }
  }, [user]);

  const queryClient = useQueryClient();

  const { isSuccess, mutate, isLoading } = useMutation({
    mutationFn: async (user: TEditUserSchema) => {
      return await axios.patch(`/api/users/${id}`, user).then((res) => res.data);
    },

    onSuccess: () => {
      toast("User Edit successfull", {
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
      let errorMessage = "Editing user failed";
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
    editUser: mutate,
    isSuccess,
    register,
    control,
    handleSubmit,
    errors,
    isLoading,
    isFetchingUserLoading,
  };
}
