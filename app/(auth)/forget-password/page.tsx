"use client";

import Logo from '@/components/logo/Logo';
import ForgetPasswordForm from './components/forget-password-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const page = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };
    return (
        <div>
            <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
                <motion.div
                    className="w-full max-w-md"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <Logo/>
                    <Card className="border-accent bg-popover shadow-lg">
                        <CardHeader className="space-y-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <CardTitle className="text-2xl font-bold text-foreground">
                                    Forget Password
                                </CardTitle>
                            </motion.div>
                        </CardHeader>
                        <CardContent>
                            <ForgetPasswordForm />
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

export default page;
