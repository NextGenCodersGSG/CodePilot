import { Code, Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-accent py-12 bg-gradient-to-b dark: from-foreground/95 dark:to-accent z-20">
    <div className="container mx-auto px-6 md:px-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl lg:text-4xl font-bold text-foreground">CodePilot</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            AI-powered code review and debugging to help developers ship better code faster.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="transition duration-150 text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="transition duration-150 text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="transition duration-150 text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-foreground">Product</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Integrations
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Changelog
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Roadmap
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Community
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Support
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                API
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-foreground">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-accent text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CodePilot. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
