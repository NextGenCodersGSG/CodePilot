"use-client";

import { Form, FormikProvider } from "formik";
import useSignup from "./hooks/useSignup";
import MotionTextField from "@/components/motion-text-field";

const SignUpForm = () => {
  const { formik } = useSignup();

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
      </Form>
    </FormikProvider>
  );
};

export default SignUpForm;
