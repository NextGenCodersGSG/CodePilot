"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ResetPasswordForm from './components/reset-password-form';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { useSearchParams } from 'next/navigation.js';
import Logo from '@/components/logo/Logo';

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
            <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
                <div className="text-red-500">Invalid password reset link</div>
            </div>
        );
    }
    
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
                    <Card className="border-accent bg-card shadow-lg">
                        <CardHeader className="space-y-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <CardTitle className="text-2xl font-bold text-foreground">
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
