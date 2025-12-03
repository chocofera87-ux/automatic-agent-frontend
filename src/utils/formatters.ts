import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export function formatTimestamp(date: Date): string {
  if (isToday(date)) {
    return `Today at ${format(date, 'HH:mm:ss')}`;
  }
  if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'HH:mm:ss')}`;
  }
  return format(date, 'MMM dd, yyyy HH:mm:ss');
}

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatPhoneNumber(phone: string): string {
  // Simple formatting for display
  if (phone.startsWith('+')) {
    return phone;
  }
  return `+${phone}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
