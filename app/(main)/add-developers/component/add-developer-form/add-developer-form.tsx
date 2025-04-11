"use-client";

import { Form, FormikProvider } from "formik";
import MotionTextField from "@/components/motion-text-field";
import useAddDeveloper from "./hook/addDeveloper";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const AddDeveloperForm = () => {
    const { formik } = useAddDeveloper();

    return (
        <FormikProvider value={formik}>
            <Form className="space-y-4">
                <MotionTextField
                    name="name"
                    placeholder="John Doe"
                    label="Full Name"
                />
                <MotionTextField
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    label="Email"
                />
                <MotionTextField
                    name="password"
                    placeholder="••••••••"
                    label="Password"
                    isPassword
                />
                <MotionTextField
                    name="confirmPassword"
                    placeholder="••••••••"
                    label="Confirm Password"
                    isPassword
                />
                <Button
                    className="cursor-pointer w-full bg-[#00406C] text-[#F2F2F2] hover:bg-[#003A61] mt-2"
                    type="submit"
                >
                    {formik.isSubmitting ? (
                        <Loader className="mr-3 h-6 w-6 animate-spin" />
                    ) : "Add Developer"}

                </Button>
            </Form>
        </FormikProvider>
    );
};

export default AddDeveloperForm;
