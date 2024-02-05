import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";

const registerUserZodSchema = z.object({
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

export type TRegisterUserSchema = z.infer<typeof registerUserZodSchema>;

export default function useCreateUser() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TRegisterUserSchema>({
    resolver: zodResolver(registerUserZodSchema),
    defaultValues: {
      country: "United States",
    },
  });

  const queryClient = useQueryClient();
  const { isSuccess, mutate, isLoading } = useMutation({
    mutationFn: async (user: TRegisterUserSchema) => {
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
    register,
    control,
    handleSubmit,
    errors,
    isLoading,
  };
}
