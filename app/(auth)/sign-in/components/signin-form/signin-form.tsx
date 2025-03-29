"use-client";

import { Form, FormikProvider } from "formik";
import MotionTextField from "@/components/motion-text-field";
import useSignin from "./hooks/useSignin";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const SignInForm = () => {
  const { formik } = useSignin();
  console.log("SignInForm");
  return (
    <FormikProvider value={formik}>
      <Form className="space-y-4">
        <MotionTextField
          name="email"
          type="email"
          placeholder="name@example.com"
          label="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <MotionTextField
          name="password"
          placeholder="••••••••"
          label="Password"
          isPassword
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          <Button
            className="cursor-pointer w-full bg-[#00406C] text-[#F2F2F2] hover:bg-[#003A61] mt-2"
            type="submit"
          >
            Sign in
          </Button>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default SignInForm;
