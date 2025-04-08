
import { useFormContext } from "react-hook-form";
import { PersonalInfoFields } from "@/lib/schemas";

export function PersonalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PersonalInfoFields>();

  return (
    <div className="space-y-4 dark:text-black">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium dark:text-white text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white ">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-white ">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
        )}
      </div>
    </div>
  );
}