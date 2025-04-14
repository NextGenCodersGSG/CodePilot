"use-client";

import { Form, FormikProvider } from "formik";
import MotionTextField from "@/components/motion-text-field";
import useSignin from "./hooks/useSignin";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import Link from "next/link";

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
        <Link href="/forget-password" className="text-sm text-primary hover:text-secondary transition-colors">
          Forgot password?
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          <Button
            className="cursor-pointer w-full bg-primary text-foreground hover:bg-secondary mt-2"
            type="submit"
          >
            {formik.isSubmitting ? (
              <Loader className=" mr-3 h-6 w-6 animate-spin text-white" />
            ) : <span className="text-white">Sign in</span>}

          </Button>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default SignInForm;
