import { AccountSetupFields } from "@/lib/schemas";
import { useFormContext } from "react-hook-form";


export function AccountSetup() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AccountSetupFields>();

  return (
    <div className="space-y-4 dark:text-black">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-white ">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          {...register("username")}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white ">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-white ">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>
    </div>
  );
}