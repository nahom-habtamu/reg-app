import useEditUser, { type TEditUserSchema } from "@/hooks/useEditUser";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

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
    isSuccess,
  } = useEditUser(id, router.isReady);

  const onSubmit = async (data: TEditUserSchema) => {
    editUser(data);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center  ${inter.className}`}
    >
      <div className="text-2xl p-6 ">Edit User Page</div>
      <form className="bg-white p-6 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal InFormation
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    {...register("firstName")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>

                {errors.firstName && (
                  <div className="text-sm text-red-500 mt-1">
                    {errors.firstName?.message ?? ""}
                  </div>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    {...register("lastName")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>

                {errors.lastName && (
                  <div className="text-sm text-red-500 mt-1">
                    {errors.lastName?.message ?? ""}
                  </div>
                )}
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register("email")}
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>

                {errors.email && (
                  <div className="text-sm text-red-500 mt-1">
                    {errors.email?.message ?? ""}
                  </div>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <select
                        id="country"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        {...field}
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    )}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    {...register("streetAddress")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.streetAddress && (
                  <div className="text-sm text-red-500 mt-1">
                    {errors.streetAddress?.message ?? ""}
                  </div>
                )}
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    {...register("city")}
                    type="text"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.city && (
                  <div className="text-sm text-red-500 mt-1">
                    {errors.city?.message ?? ""}
                  </div>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    {...register("region")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.region && (
                  <div className="text-sm text-red-500 mt-1">
                    {errors.region?.message ?? ""}
                  </div>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    {...register("postalCode")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.postalCode && (
                  <div className="text-sm text-red-500 mt-1">
                    {errors.postalCode?.message ?? ""}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            className="rounded-md w-96 h-14 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditUserPage;
