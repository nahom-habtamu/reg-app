import { LoadingSpinner } from "@/components/LoadingSpinner";
import { NavBar } from "@/components/NavBar";
import { DropDownInput } from "@/components/form/DropDownInput";
import { Input } from "@/components/form/Input";
import useEditUser, { type TEditUserSchema } from "@/hooks/useEditUser";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const EditUserPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const {
    editUser,
    control,
    errors,
    handleSubmit,
    isLoading,
    register,
    isFetchingUserLoading,
  } = useEditUser(id);

  const onSubmit = async (data: TEditUserSchema) => {
    editUser(data);
  };

  return (
    <>
      <NavBar activePage="register" />
      <main
        className={`flex min-h-screen flex-col items-center  ${inter.className}`}
      >
        <div className="text-2xl pt-8">Edit Users</div>
        <div className="text text-sm text-center text-gray-400 max-w-[600px] mx-auto mt-2 mb-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Necessitatibus, odio quos voluptas dolore provident hic porro sed
          alias est voluptatibus
        </div>

        {isFetchingUserLoading ? (
          <div className="bg-white p-6 border border-green-400 h-96 min-w-[800px] flex justify-center items-center">
            <LoadingSpinner size="lg"/>
          </div>
        ) : (
          <form
            className="bg-white p-6 border border-green-400 min-w-[800px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-12 ">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <Input
                    errorMessage={errors.firstName?.message}
                    inputKey="firstName"
                    register={register}
                    label="First name"
                  />
                </div>

                <div className="sm:col-span-3">
                  <Input
                    errorMessage={errors.lastName?.message}
                    inputKey="lastName"
                    register={register}
                    label="Last name"
                  />
                </div>

                <div className="sm:col-span-3">
                  <Input
                    errorMessage={errors.email?.message}
                    inputKey="email"
                    register={register}
                    label="Email address"
                  />
                </div>

                <div className="sm:col-span-3">
                  <DropDownInput
                    control={control}
                    inputKey="country"
                    label="Country"
                    options={["United States", "Mexico", "Canada"]}
                  />
                </div>

                <div className="sm:col-span-3">
                  <Input
                    errorMessage={errors.streetAddress?.message}
                    inputKey="streetAddress"
                    register={register}
                    label="Street Address"
                  />
                </div>

                <div className="sm:col-span-3">
                  <Input
                    errorMessage={errors.city?.message}
                    inputKey="city"
                    register={register}
                    label="City"
                  />
                </div>

                <div className="sm:col-span-3">
                  <Input
                    errorMessage={errors.region?.message}
                    inputKey="region"
                    register={register}
                    label="State / Province"
                  />
                </div>

                <div className="sm:col-span-3">
                  <Input
                    errorMessage={errors.postalCode?.message}
                    inputKey="postalCode"
                    register={register}
                    label="ZIP / Postal code"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center">
              <button
                type="submit"
                className="rounded-md w-96 h-14 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 disabled:bg-green-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </main>
    </>
  );
};

export default EditUserPage;
