"use client";

import { Form, FormikProvider } from 'formik';
import MotionTextField from '@/components/motion-text-field/motion-text-field';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import useResetPassword from './hook/useResetPassword';

interface IProps {
    resetToken: string;
    id: string;
}

const ResetPasswordForm = (props: IProps) => {
    const { formik } = useResetPassword(props.resetToken, props.id);
    return (
        <div>
            <FormikProvider value={formik}>
                <Form className="space-y-4">
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
                                <Loader className="mr-3 h-6 w-6 animate-spin text-white" />
                            ) : <span className="text-white" >Reset Password</span>}

                        </Button>
                    </motion.div>
                </Form>
            </FormikProvider>
        </div>
    )
}

export default ResetPasswordForm
