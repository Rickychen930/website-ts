/**
 * Date Utilities - Pure functions for date formatting
 */

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

export const formatDateRange = (
  startDate: string,
  endDate?: string,
): string => {
  const start = formatDate(startDate);
  if (!endDate) {
    return `${start} - Present`;
  }
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};

export const getDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  let totalMonths = years * 12 + months;
  if (totalMonths < 0) {
    totalMonths = 0;
  }

  const yearsPart = Math.floor(totalMonths / 12);
  const monthsPart = totalMonths % 12;

  if (yearsPart === 0) {
    return `${monthsPart} ${monthsPart === 1 ? "month" : "months"}`;
  }

  if (monthsPart === 0) {
    return `${yearsPart} ${yearsPart === 1 ? "year" : "years"}`;
  }

  return `${yearsPart} ${yearsPart === 1 ? "year" : "years"} ${monthsPart} ${monthsPart === 1 ? "month" : "months"}`;
};
