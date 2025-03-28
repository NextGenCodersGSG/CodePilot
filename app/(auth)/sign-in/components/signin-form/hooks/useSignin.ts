"use client";

import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constant";
import { validationSchema } from "../validationSchema";

const useSignin = () => {
    const handleSignup = (values: FormValues) => {
        console.log(values);
    };

    const formik = useFormik<FormValues>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values) => {
            handleSignup(values);
        },
        validationSchema,
        validateOnMount: true,
    });

    return { formik };
};

export default useSignin;
