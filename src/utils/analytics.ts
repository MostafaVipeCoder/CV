import ReactGA from 'react-ga4';

/**
 * Initialize Google Analytics
 * Call this once when the app starts
 */
export const initGA = () => {
  const GA_ID = import.meta.env.VITE_GA_ID;

  if (GA_ID) {
    ReactGA.initialize(GA_ID);
    console.log('Google Analytics initialized');
  } else {
    console.warn('Google Analytics ID not found. Set VITE_GA_ID in your .env file');
  }
};

/**
 * Log a page view
 */
export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};

/**
 * Log a custom event
 * @param category - Event category (e.g., 'CV', 'Contact', 'Portfolio')
 * @param action - Event action (e.g., 'Download', 'Submit', 'Click')
 * @param label - Optional event label for additional context
 */
export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

/**
 * Log a timing event
 * @param category - Timing category
 * @param variable - Timing variable name
 * @param value - Time in milliseconds
 */
export const logTiming = (category: string, variable: string, value: number) => {
  ReactGA.event({
    category: 'timing',
    action: category,
    label: variable,
    value,
  });
};
