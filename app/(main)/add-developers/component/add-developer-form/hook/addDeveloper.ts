"use client";

import { useFormik } from "formik";
import { validationSchema } from "../validationSchema";
import { FormValues } from "../type";
import { INITIAL_VALUES } from "../constant";

const useAddDeveloper = () => {
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

export default useAddDeveloper;
