/**
 * Format a date string to display in the user's local timezone using English formatting
 */
export function formatDate(dateString: string, includeTime = true): string {
  try {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    if (includeTime) {
      Object.assign(options, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    return date.toLocaleString("en-US", options);
  } catch {
    return "Unknown date";
  }
}

/**
 * Get relative time string (e.g., "2 hours ago") from a date
 */
export function getRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();

    if (Number.isNaN(date.getTime())) {
      return "Unknown time";
    }

    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffMonth / 12);

    if (diffYear > 0) {
      return diffYear === 1 ? "1 year ago" : `${diffYear} years ago`;
    }
    if (diffMonth > 0) {
      return diffMonth === 1 ? "1 month ago" : `${diffMonth} months ago`;
    }
    if (diffDay > 0) {
      return diffDay === 1 ? "1 day ago" : `${diffDay} days ago`;
    }
    if (diffHour > 0) {
      return diffHour === 1 ? "1 hour ago" : `${diffHour} hours ago`;
    }
    if (diffMin > 0) {
      return diffMin === 1 ? "1 minute ago" : `${diffMin} minutes ago`;
    }

    return "Just now";
  } catch {
    return "Unknown time";
  }
}

/**
 * Format date in a compact way (e.g., Apr 21, 2025)
 */
export function formatCompactDate(dateString: string): string {
  try {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Unknown";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Unknown";
  }
}
