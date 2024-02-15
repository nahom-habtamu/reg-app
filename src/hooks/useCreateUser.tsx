import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
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
    .gt(999, "Postal code should be a 4 digit postive number"),
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

  const {
    isSuccess,
    mutate: createUser,
    isLoading,
  } = useMutation({
    mutationFn: async (user: TRegisterUserSchema) => {
      return await axios.post("/api/users", user).then((res) => res.data);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  return {
    createUser,
    isSuccess,
    register,
    control,
    handleSubmit,
    errors,
    isLoading,
  };
}
