"use client";

import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constant";
import { validationSchema } from "../validationSchema";

const useSignin = () => {
    console.log("useSignin");
  const handleSignin = async (
    values: FormValues,
    resetForm: () => void,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    console.log("values",values);
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
        console.log(`${data.error}`);
        return;
      }
      resetForm();
      console.log("Signin successful");
    } catch (error: any) {
      console.log(`Signin error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: INITIAL_VALUES,
    onSubmit: (values, { resetForm, setSubmitting }) => {
        console.log("initialValues");
        console.log(values);
      handleSignin(values, resetForm, setSubmitting);
    },
    validationSchema,
    validateOnMount: true,
  });

  return { formik };
};

export default useSignin;
