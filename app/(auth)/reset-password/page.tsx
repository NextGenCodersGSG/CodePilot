"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ResetPasswordForm from './components/reset-password-form';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { useSearchParams } from 'next/navigation.js';

const page = () => {
    const searchParams = useSearchParams();
    const resetToken = searchParams.get('resetToken');
    const id = searchParams.get('id');
    console.log(resetToken);
    console.log(id);
    
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

    if (!resetToken || !id) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#00111C] p-4">
                <div className="text-red-500">Invalid password reset link</div>
            </div>
        );
    }
    
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
                                    Reset Password
                                </CardTitle>
                            </motion.div>
                        </CardHeader>
                        <CardContent>
                            <ResetPasswordForm resetToken={resetToken} id={id}/>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

export default page;
