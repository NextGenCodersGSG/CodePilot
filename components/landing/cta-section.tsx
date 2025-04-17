import { motion } from 'framer-motion'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'

const CTASection = () => {
  return (
    <section id="get-started" className="py-20 bg-gradient-to-b from-accent via-accent/85 to-muted">
    <div className="container px-4 md:px-6 mx-auto">
      <motion.div
        className=" rounded-lg bg-gradient-to-b from-accent to-background p-8 md:p-12 lg:p-16 relative overflow-hidden border border-accent"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              Ready to write better code?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of developers who are shipping better code faster with CodePilot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-in">
                <Button size="lg" className="cursor-pointer w-full sm:w-auto bg-primary hover:bg-secondary text-white">
                  Start your free trial
                </Button>
              </Link>
              <Link href="/code-analysis/book-meeting">
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer w-full sm:w-auto border-accent text-white bg-accent hover:bg-muted hover:text-foreground"
                >
                  Schedule a demo
                </Button>
              </Link>
            </div>
          </div>
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src="/CTASection.jpg"
              alt="CodePilot in action"
              className="rounded-lg border-2 border-accent"
              width={800}
              height={500}
            />
          </motion.div>
        </div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
      </motion.div>
    </div>
  </section>
  )
}

export default CTASection
