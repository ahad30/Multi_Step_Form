import { FormFields } from "@/lib/schemas";

export function FormSummary({ summaryData }: { summaryData: FormFields }) {
  return (
    <div className="gap-5 grid grid-cols-1 lg:grid-cols-2 dark:text-black">
      <div className="space-y-2 border p-5 rounded-md bg-gray-50 shadow-md">
        <h3 className="text-xl font-medium">Personal Information</h3>
        <p>
          <span className="font-medium">Full Name:</span> {summaryData.fullName}
        </p>
        <p>
          <span className="font-medium">Email:</span> {summaryData.email}
        </p>
        <p>
          <span className="font-medium">Phone Number:</span> {summaryData.phoneNumber}
        </p>
      </div>

      <div className="space-y-2 border p-5 rounded-md bg-gray-50 shadow-md">
        <h3 className="text-xl font-medium">Address Details</h3>
        <p>
          <span className="font-medium">Street Address:</span> {summaryData.streetAddress}
        </p>
        <p>
          <span className="font-medium">City:</span> {summaryData.city}
        </p>
        <p>
          <span className="font-medium">Zip Code:</span> {summaryData.zipCode}
        </p>
      </div>

      <div className="space-y-2 border p-5 rounded-md bg-gray-50 shadow-md">
        <h3 className="text-xl font-medium">Account Setup</h3>
        <p>
          <span className="font-medium">Username:</span> {summaryData.username}
        </p>
        <p>
          <span className="font-medium">Password:</span> {summaryData.password}
        </p>
      </div>
    </div>
  );
}