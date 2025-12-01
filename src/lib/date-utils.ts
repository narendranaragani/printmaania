/**
 * Consistent date formatting to prevent hydration mismatches
 * Always uses the same format regardless of server/client locale
 */
export function formatDate(date: Date | null | undefined): string {
  if (!date) return "N/A";
  
  // Convert to Date if it's a Firestore Timestamp or other format
  const d = date instanceof Date ? date : new Date(date);
  
  // Use consistent format: "DD MMM YYYY"
  const day = String(d.getDate()).padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  
  return `${day} ${month} ${year}`;
}

/**
 * Format date with time
 */
export function formatDateTime(date: Date | null | undefined): string {
  if (!date) return "N/A";
  
  const d = date instanceof Date ? date : new Date(date);
  
  const day = String(d.getDate()).padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

