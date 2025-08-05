/**
 * Format a date string to a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Jan 1, 2023")
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Format a date string to include time
 * @param dateString - ISO date string
 * @returns Formatted date and time string (e.g., "Jan 1, 2023, 3:30 PM")
 */
export const formatDateTime = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

/**
 * Calculate time elapsed since a given date
 * @param dateString - ISO date string
 * @returns Human-readable time elapsed (e.g., "2 days ago", "just now")
 */
export const timeAgo = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Less than a minute
  if (seconds < 60) {
    return 'just now';
  }
  
  // Less than an hour
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  // Less than a day
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  // Less than a week
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
  
  // Less than a month
  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  
  // Less than a year
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
  
  // More than a year
  const years = Math.floor(days / 365);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
};

/**
 * Format a date range (e.g., for experience or education)
 * @param startDate - Start date string
 * @param endDate - End date string (optional)
 * @param current - Whether this is a current position/education
 * @returns Formatted date range (e.g., "Jan 2020 - Present" or "Jan 2020 - Dec 2022")
 */
export const formatDateRange = (startDate: string, endDate?: string, current?: boolean): string => {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  const startFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(start);
  
  if (current) {
    return `${startFormatted} - Present`;
  }
  
  if (!endDate) {
    return startFormatted;
  }
  
  const end = new Date(endDate);
  const endFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(end);
  
  return `${startFormatted} - ${endFormatted}`;
};