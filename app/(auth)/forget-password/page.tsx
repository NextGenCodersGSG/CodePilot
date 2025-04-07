"use client";

import ForgetPasswordForm from './components/forget-password-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

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
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#00111C] p-4">
                <motion.div
                    className="w-full max-w-md"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <Code className="h-8 w-8 text-[#00406C]" />
                        <span className="text-2xl font-bold text-[#F2F2F2]">CodePilot</span>
                    </div>

                    <Card className="border-[#002945] bg-[#001523] shadow-lg">
                        <CardHeader className="space-y-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <CardTitle className="text-2xl font-bold text-[#F2F2F2]">
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
