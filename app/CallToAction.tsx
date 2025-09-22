/**
 * Call to Action Section
 */
"use client";
import { Download, Mail, Linkedin, Github } from "lucide-react";

export default function CallToAction() {
  const handleDownloadResume = () => {
    // Replace with actual resume file path
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Jhensen_Ray_Agni_Resume.pdf';
    link.click();
  };

  return (
    <section className="pt-8 md:pt-12 pb-8 px-6 md:px-0">
      <div className="bg-navy/50 rounded-lg p-6 sm:p-8 border border-slate/20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-lightest-slate mb-4 text-center">
          Let&apos;s Build Something Amazing Together
        </h2>
        <p className="text-slate text-center mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
          Ready to discuss opportunities or collaborate on robotics projects?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-2 bg-teal text-navy px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-teal/80 transition-colors duration-300 text-sm sm:text-base md:text-lg w-full sm:w-auto justify-center"
          >
            <Download size={16} className="sm:w-5 sm:h-5" />
            Download Resume
          </button>
          <a
            href="mailto:jhensenrayagni@gmail.com"
            className="flex items-center gap-2 border border-teal text-teal px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-teal hover:text-navy transition-colors duration-300 text-sm sm:text-base md:text-lg w-full sm:w-auto justify-center"
          >
            <Mail size={16} className="sm:w-5 sm:h-5" />
            Get In Touch
          </a>
        </div>
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://linkedin.com/in/jhensenrayagni"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-teal transition-colors duration-300"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/jragni"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-teal transition-colors duration-300"
            aria-label="GitHub Profile"
          >
            <Github size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}