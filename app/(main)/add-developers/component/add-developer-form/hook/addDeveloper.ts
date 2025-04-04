"use client";

import { useFormik } from "formik";
import { validationSchema } from "../validationSchema";
import { FormValues } from "../type";
import { INITIAL_VALUES } from "../constant";
import { toast } from "sonner";

const useAddDeveloper = () => {
    const handleSignup = async(values: FormValues, resetForm: () => void, setSubmitting: (isSubmitting: boolean) => void) => {
        try {
            const response = await fetch(`/api/auth/add-developer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error(`${data.error}`);
                return;
            }
            resetForm();
            toast.success("Developer Added successful");
        } catch (error: any) {
            toast.error(`error: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    const formik = useFormik<FormValues>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values,  { resetForm, setSubmitting }) => {
            handleSignup(values, resetForm, setSubmitting);
        },
        validationSchema,
        validateOnMount: true,
    });

    return { formik };
};

export default useAddDeveloper;
