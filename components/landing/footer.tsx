import { Code, Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-[#002945] py-12 bg-gradient-to-b dark: from-[#00111C]/95 dark:to-[#002945] z-20">
    <div className="container mx-auto px-6 md:px-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Code className="h-6 w-6 text-[#00406C]" />
            <span className="text-xl font-bold text-[#F2F2F2]">CodePilot</span>
          </div>
          <p className="text-sm text-[#B3B3B3] mb-4">
            AI-powered code review and debugging to help developers ship better code faster.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="transition duration-150 text-[#B3B3B3] hover:text-[#00406C]">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="transition duration-150 text-[#B3B3B3] hover:text-[#00406C]">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="transition duration-150 text-[#B3B3B3] hover:text-[#00406C]">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-[#F2F2F2]">Product</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Integrations
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Changelog
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Roadmap
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-[#F2F2F2]">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Community
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Support
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                API
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-[#F2F2F2]">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="transition duration-150 text-sm text-[#B3B3B3] hover:text-[#00406C]">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-[#002945] text-center text-sm text-[#B3B3B3]">
        <p>&copy; {new Date().getFullYear()} CodePilot. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
