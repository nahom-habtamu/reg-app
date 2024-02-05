import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";
import useUser from "./useUser";
import { useEffect, useRef } from "react";

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

export default function useEditUser(id: string, enabled: boolean) {
  const { user: fetchedUser } = useUser(id ?? "", enabled);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset: resetFormData,
  } = useForm<TEditUserSchema>({
    resolver: zodResolver(editUserZodSchema),
    defaultValues: {},
  });

  const fillDataOnce = useRef<boolean>(true);

  useEffect(() => {
    if (fillDataOnce && fetchedUser) {
      resetFormData({ ...fetchedUser });
    }
  }, [resetFormData, fetchedUser]);

  const queryClient = useQueryClient();

  const { isSuccess, mutate, isLoading } = useMutation({
    mutationFn: async (user: TEditUserSchema) => {
      return await axios
        .patch(`/api/users/${id}`, user)
        .then((res) => res.data);
    },
    onMutate: (updatedUser) => {
      const oldUsers = queryClient.getQueryData("users");

      if (queryClient.getQueryData("users")) {
        queryClient.setQueryData("users", (old: any) =>
          old.map((oldItem: any) => {
            if (oldItem.id === id) {
              return {
                id: id,
                ...updatedUser,
              };
            } else {
              return oldItem;
            }
          })
        );
      }

      return () => queryClient.setQueryData("users", oldUsers);
    },
    onSuccess: () => {
      alert("Edit Successfull");
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries("users");
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
  };
}
