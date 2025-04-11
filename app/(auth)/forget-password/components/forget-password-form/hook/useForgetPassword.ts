"use client";

import { useFormik } from "formik";
import { INITIAL_VALUES } from "../constant";
import { validationSchema } from "../validationSchema";
import { toast } from "sonner";
import { FormValues } from "../type";

const useForgetPassword = () => {
    const handleForgetPassword = async (
        values: FormValues,
        resetForm: () => void,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try {
            const response = await fetch(
                `/api/auth/forget-password`,
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
            toast.success("Email Send successful");
        } catch (error: any) {
            toast.error(`error: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    const formik = useFormik<FormValues>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            handleForgetPassword(values, resetForm, setSubmitting);
        },
        validationSchema,
        validateOnMount: true,
    });

    return { formik };
};

export default useForgetPassword;
