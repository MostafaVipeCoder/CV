// Utility functions for the portfolio website
import { logEvent } from './analytics';
import { asset } from '../lib/asset';

/**
 * Handles CV download with analytics tracking
 */
export const handleDownloadCV = () => {
  // Track the download event
  logEvent('CV', 'Download', 'Download CV Button');

  const link = document.createElement('a');
  link.href = asset('/assets/Abdullah_Shaban_CV.pdf');
  link.download = 'Abdullah_Shaban_CV.pdf';
  link.click();
};

/**
 * Smooth scroll to a section by ID
 */
export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
