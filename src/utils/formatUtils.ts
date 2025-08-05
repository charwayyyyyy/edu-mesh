/**
 * Truncate a string to a specified length and add ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Format a number as currency
 * @param amount - Number to format
 * @param currency - Currency code (default: 'GHS' for Ghana Cedi)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'GHS'): string => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format a number with commas for thousands
 * @param number - Number to format
 * @returns Formatted number string with commas
 */
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat().format(number);
};

/**
 * Capitalize the first letter of each word in a string
 * @param text - Text to capitalize
 * @returns Text with first letter of each word capitalized
 */
export const capitalizeWords = (text: string): string => {
  if (!text) return '';
  
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Convert a string to title case (capitalize first letter of each word except articles)
 * @param text - Text to convert to title case
 * @returns Text in title case
 */
export const toTitleCase = (text: string): string => {
  if (!text) return '';
  
  const articles = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'in'];
  
  return text
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      // Always capitalize the first word and any word that's not an article
      if (index === 0 || !articles.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(' ');
};

/**
 * Format a file size in bytes to a human-readable format
 * @param bytes - File size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted file size string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

/**
 * Format a phone number for display
 * @param phone - Phone number to format
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length (assuming Ghana phone numbers)
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // International format
  if (cleaned.length > 10) {
    return `+${cleaned.slice(0, cleaned.length - 9)} ${cleaned.slice(-9, -6)} ${cleaned.slice(-6, -3)} ${cleaned.slice(-3)}`;
  }
  
  // Return original if we can't format it
  return phone;
};