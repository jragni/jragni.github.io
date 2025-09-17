/**
 * SocialNav
 */
import { FileUser, Github, Linkedin } from 'lucide-react'
import Link from 'next/link';

export interface FooterProps {
	className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <footer className="flex gap-6">
      <Link
        className="hover:text-teal"
        href="https://github.com/jragni"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Github className="text-slate-400 w-8 h-8" />
        <span className="sr-only">GitHub</span>
      </Link>
      <Link
        className="hover:text-teal"
        href="https://linkedin.com/in/jhensenagni"
        rel="noopener noreferrer"
        target="_blank"
      >
          <Linkedin className="text-slate-400 w-8 h-8" />
          <span className="sr-only">LinkedIn</span>
      </Link>
      <Link
        className="hover:text-teal"
        href="FINAL-june-24-resume.pdf"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="text-slate-400 w-8 h-8">
          <FileUser className="w-8 h-8" />
        </span>
        <span className="sr-only">Resume</span>
      </Link>
      </footer>
    </div>
  );
}
