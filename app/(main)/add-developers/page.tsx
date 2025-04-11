"use client";

import React from 'react';
import AddDeveloperForm from './component/add-developer-form';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/logo/Logo';

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

const page = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#00111C] p-4">
            <motion.div
                className="w-full max-w-md"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Logo/>

                <Card className="border-[#002945] bg-[#001523] shadow-lg">
                    <CardHeader className="space-y-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <CardTitle className="text-2xl font-bold text-[#F2F2F2]">
                                Add Developer
                            </CardTitle>
                        </motion.div>
                    </CardHeader>
                    <CardContent>
                        <AddDeveloperForm />
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}

export default page;
