/**
 * Portfolio type definitions
 */

export interface ExperienceCardProps {
  companyName: string;
  date: string;
  href: string;
  jobDescription: string[];
  skills: string[];
  title: string;
}

export interface ProjectCardDetails {
  description: string;
  href: string;
  skills: string[];
  src: string;
  title: string;
}