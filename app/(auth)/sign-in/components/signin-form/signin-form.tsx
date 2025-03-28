"use-client";

import { Form, FormikProvider } from "formik";
import MotionTextField from "@/components/motion-text-field";
import useSignin from "./hooks/useSignin";

const SignInForm = () => {
  const { formik } = useSignin();

  return (
    <FormikProvider value={formik}>
      <Form className="space-y-4">
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
      </Form>
    </FormikProvider>
  );
};

export default SignInForm;
