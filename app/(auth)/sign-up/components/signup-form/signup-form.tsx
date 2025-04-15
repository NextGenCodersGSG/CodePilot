"use-client";

import { Form, FormikProvider } from "formik";
import useSignup from "./hooks/useSignup";
import MotionTextField from "@/components/motion-text-field";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <Button
            className="cursor-pointer w-full bg-primary text-foreground hover:bg-secondary mt-2"
            type="submit" 
        >
            {formik.isSubmitting ? (
              <Loader className="mr-3 h-6 w-6 animate-spin text-white" />
            ) : <span className="text-white">Create Account</span>}
            
        </Button>
      </Form>
    </FormikProvider>
  );
};

export default SignUpForm;
