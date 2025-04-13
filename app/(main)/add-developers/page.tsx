"use client";

import React from 'react';
import Head from 'next/head';
import AddDeveloperForm from './component/add-developer-form';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const Page = () => {
    return (
        <>
            <Head>
                <title>Add Developer | NextGenCoders</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta 
                    name="description" 
                    content="Add a new developer to your team with ease. Our platform simplifies the process of onboarding new talent, ensuring seamless integration into your development workflow."
                />
                <meta 
                    name="keywords" 
                    content="add developer, developer management, software engineering, team onboarding, admin tools"
                />
                <meta name="codepilot" content="NextGenCoders" />

                {/* Open Graph */}
                <meta property="og:title" content="Add Developer | NextGenCoders" />
                <meta 
                    property="og:description" 
                    content="Streamline the process of adding new developers to your team. Enhance your development workflow with our intuitive admin dashboard."
                />
                <meta property="og:image" content="/CodePilotLogo.png" />
                <meta property="og:url" content="https://nextgencoders.com/add-developer" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="NextGenCoders" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@NextGenCoders" />
                <meta name="twitter:creator" content="@NextGenCoders" />
            </Head>

            <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
                <motion.div
                    className="w-full max-w-md"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <Logo />

                    <Card className="border-accent bg-sidebar shadow-lg">
                        <CardHeader className="space-y-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <CardTitle className="text-2xl font-bold text-foreground">
                                    Add Developer
                                </CardTitle>
                            </motion.div>
                        </CardHeader>
                        <CardContent>
                            <AddDeveloperForm />
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </>
    );
};

export default Page;