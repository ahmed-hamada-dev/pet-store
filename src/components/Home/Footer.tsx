"use client";

import Link from "next/link";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 text-foreground animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
            <h4 className="text-xl font-bold text-foreground mb-4">
              Pet Haven
            </h4>
            <p className="text-muted-foreground text-sm">
              Your one-stop shop for premium pet supplies and a vibrant
              community.
            </p>
          </div>

          {/* Explore Section */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
            <h4 className="text-xl font-bold text-foreground mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products/1"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected Section */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
            <h4 className="text-xl font-bold text-foreground mb-4">
              Stay Connected
            </h4>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <a
                  href="tel:+201060257232"
                  className="text-muted-foreground hover:text-primary text-sm"
                  aria-label="Call us at +201060257232"
                >
                  +20 106 025 7232
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <a
                  href="mailto:contact@ahmed-hamada.dev"
                  className="text-muted-foreground hover:text-primary text-sm"
                  aria-label="Email us at contact@ahmed-hamada.dev"
                >
                  contact@ahmed-hamada.dev
                </a>
              </div>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/ahmed-hamada-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Visit our LinkedIn profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/ahmed-hamada-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Visit our GitHub profile"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-t border-muted-foreground/20 animate-in fade-in duration-1000 delay-500 fill-mode-both" />

        {/* Copyright */}
        <div className="text-center text-muted-foreground text-sm animate-in fade-in duration-500 delay-600 fill-mode-both">
          <p>© 2025 Snow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
