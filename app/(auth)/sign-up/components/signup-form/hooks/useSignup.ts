"use client";

import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constant";
import { validationSchema } from "../validationSchema";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const useSignup = () => {
    
    const handleSignup = async (
        values: FormValues,
        resetForm: () => void,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/sign-up`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(values)
                }
            )
            const data = await res.json();
            if(!res.ok) {
                toast.error(data.error);
                return;
            }
            resetForm();
            toast.success("Account Created Successfully, You will be redirected to the login screen!");
            setTimeout(() => {
                redirect("/sign-in")
            }, 2000)
        }
        catch(error: any) {
            toast.error(`sign-up Error: ${error.message}`)
        }
        finally {
            setSubmitting(false);
        }
    }

    const formik = useFormik<FormValues>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values, {resetForm, setSubmitting}) => {
            handleSignup(values, resetForm, setSubmitting);
        },
        validationSchema,
        validateOnMount: true,
    });

    return { formik };
};

export default useSignup;
