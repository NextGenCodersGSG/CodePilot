"use client";

import { Form, FormikProvider } from 'formik';
import MotionTextField from '@/components/motion-text-field/motion-text-field';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import useForgetPassword from './hook/useForgetPassword';

const ForgetPasswordForm = () => {
    const {formik} = useForgetPassword();
    return (
        <div>
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
                            {formik.isSubmitting ? (
                                <Loader className="mr-3 h-6 w-6 animate-spin" />
                            ) : "Reset Password"}
                        </Button>
                    </motion.div>
                </Form>
            </FormikProvider>
        </div>
    )
}

export default ForgetPasswordForm
