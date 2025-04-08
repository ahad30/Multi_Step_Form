"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FormFields, formSchema } from "@/lib/schemas";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { PersonalInfo } from "./PersonalInfo";
import { AddressDetails } from "./AddressDetails";
import { AccountSetup } from "./AccountSetup";
import { FormSummary } from "./FormSummary";

async function submitForm(data: FormFields) {
  const response = await fetch('https://task-management-server-gamma-one.vercel.app/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export default function MultiStepForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormFields>({
    fullName: '',
    email: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const { currentStepIndex, steps, isFirstStep, isLastStep, next, back } = useMultiStepForm();
  const methods = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      setIsSubmitted(true);
    },
    onError: (error) => {
      console.error('Submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    },
  });

  async function onNext() {
    let isValid = false;
  
    if (currentStepIndex === 0) {
      isValid = await methods.trigger(["fullName", "email", "phoneNumber"]);
      if (isValid) {
        const { fullName, email, phoneNumber } = methods.getValues();
        setFormData(prev => ({ ...prev, fullName, email, phoneNumber }));
      }
    } 
    else if (currentStepIndex === 1) {
      isValid = await methods.trigger(["streetAddress", "city", "zipCode"]);
      if (isValid) {
        const { streetAddress, city, zipCode } = methods.getValues();
        setFormData(prev => ({ ...prev, streetAddress, city, zipCode }));
      }
    } 
    else if (currentStepIndex === 2) {
      isValid = await methods.trigger(["username", "password", "confirmPassword"]);
      
      const { password, confirmPassword, username } = methods.getValues();
      if (password !== confirmPassword) {
        methods.setError("confirmPassword", {
          type: "manual",
          message: "Passwords don't match"
        });
        isValid = false;
      } else if (isValid) {
        setFormData(prev => ({ ...prev, username, password }));
      }
    }
  
    if (isValid) next();
  }
  

 const onSubmit = (data: FormFields) => {
    console.log('Final form data before submission:', data);
    setFormData(data);
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center text-green-500">Thank You!</h2>
        <p className="text-center font-bold text-xl dark:text-black">Your form details has been submitted successfully.</p>
      </div>
      </div>
    );
  }

  return (
   <section className="py-5">
     <div className="max-w-full lg:max-w-2xl mx-auto px-5 py-10 bg-gray-100 dark:bg-gray-900  rounded-lg shadow-md dark:shadow-gray-800 dark:border-gray-700 dark:border-2 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-center">Give Your Details Here</h2>

      <div className="flex justify-between mb-8">
       {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center">
          <button
            type="button"
            disabled={index > currentStepIndex}
            className={`w-10 h-10 rounded-full flex items-center text-sm justify-center ${
              index <= currentStepIndex
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600 disabled:cursor-not-allowed"
            }`}
          >
            {index + 1}
          </button>
          <span className="text-[9px] lg:text-sm mt-2">{step.title}</span>
        </div>
      ))}
    </div>

      <FormProvider {...methods}>
      <form
     onSubmit={(e) => {
    e.preventDefault(); 
   }}

>

          {currentStepIndex === 0 && <PersonalInfo />}
          {currentStepIndex === 1 && <AddressDetails />}
          {currentStepIndex === 2 && <AccountSetup />}
          {currentStepIndex === 3 && <FormSummary summaryData={formData}/>}

          <div className="flex justify-between mt-6">
            {!isFirstStep && (
              <button
                type="button"
                onClick={back}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Back
              </button>
            )}
            {!isLastStep ? (
              <button
                type="button"
                onClick={onNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
                disabled={mutation.isPending}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : "Submit"}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
   </section>
  );
}