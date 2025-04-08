import { useFormContext } from "react-hook-form";
import { AddressDetailsFields } from "@/lib/schemas";


export function AddressDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddressDetailsFields>();

  return (
    <div className="space-y-4 dark:text-black">
      <div>
        <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700  dark:text-white ">
          Street Address
        </label>
        <input
          id="streetAddress"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          {...register("streetAddress")}
        />
        {errors.streetAddress && (
          <p className="mt-1 text-sm text-red-600">{errors.streetAddress.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-white ">
          City
        </label>
        <input
          id="city"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          {...register("city")}
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-white ">
          Zip Code
        </label>
        <input
          id="zipCode"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          {...register("zipCode")}
        />
        {errors.zipCode && (
          <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
        )}
      </div>
    </div>
  );
}