"use client";

import { useFormik } from "formik";
import { INITIAL_VALUES } from "../constant";
import { validationSchema } from "../validationSchema";
import { toast } from "sonner";
import { FormValues } from "../type";

const useResetPassword = (resetToken: string, id: string) => {
  const handleResetPassword = async (
    values: FormValues,
    resetForm: () => void,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      const response = await fetch(`/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...values,
          resetToken,
          userId: id
        })
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(`${data.error}`);
        return;
      }
      resetForm();
      toast.success("Password Reset successful");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`error: ${error.message}`);
      } else {
        toast.error(`error: ${String(error)}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: INITIAL_VALUES,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      handleResetPassword(values, resetForm, setSubmitting);
    },
    validationSchema,
    validateOnMount: true
  });

  return { formik };
};

export default useResetPassword;
