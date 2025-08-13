"use client";

import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constant";
import { validationSchema } from "../validationSchema";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const useSignin = () => {
  const handleSignin = async (
    values: FormValues,
    resetForm: () => void,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      const response = await fetch(`/api/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(`${data.error}`);
        return;
      }

      resetForm();
      toast.success("Signin successful", { duration: 1000 });
      localStorage.setItem("auth-token", data.token);
      const role: string = data.role;

      setTimeout(() => {
        if (role === "admin") {
          redirect("/dashboard");
        } else {
          redirect("/code-analysis");
        }
      }, 500);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Signin error: ${error.message}`);
      } else {
        toast.error(`Signin error: ${String(error)}`);
      }
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
    validateOnMount: true
  });

  return { formik };
};

export default useSignin;
