import { FormSteps } from "@/lib/formSteps";
import { useState } from "react";

export function useMultiStepForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= FormSteps.length - 1) {
        return i
      };
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) {
        return i
      };
      return i - 1;
    });
  }
  return {
    currentStepIndex,
    steps: FormSteps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === FormSteps.length - 1,
    next,
    back,
  };
}