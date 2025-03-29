"use client";

import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constant";
import { validationSchema } from "../validationSchema";
import { toast } from "sonner";

const useSignin = () => {
  const handleSignin = async (
    values: FormValues,
    resetForm: () => void,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(`${data.error}`);
        return;
      }
      resetForm();
      toast.success("Signin successful");
    } catch (error: any) {
      toast.error(`Signin error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: INITIAL_VALUES,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      handleSignin(values, resetForm, setSubmitting);
    },
    validationSchema,
    validateOnMount: true,
  });

  return { formik };
};

export default useSignin;
