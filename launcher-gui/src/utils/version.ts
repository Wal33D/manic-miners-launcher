/**
 * Utility functions for version handling
 */

/**
 * Parses a version string into an array of numbers for comparison
 * @param version - Version string (e.g., "1.2.3")
 * @returns Array of numbers for comparison
 */
export function parseVersion(version: string): number[] {
  return version.split('.').map(num => parseInt(num, 10) || 0);
}

/**
 * Compares two version strings
 * @param a - First version string
 * @param b - Second version string
 * @returns Negative if a < b, positive if a > b, 0 if equal
 */
export function compareVersions(a: string, b: string): number {
  const aParts = parseVersion(a);
  const bParts = parseVersion(b);
  
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const numA = aParts[i] || 0;
    const numB = bParts[i] || 0;
    if (numA !== numB) return numB - numA; // Descending order (newer first)
  }
  
  return 0;
}

/**
 * Sorts an array of objects containing version fields in descending order (newest first)
 * @param items - Array of items with version field
 * @returns Sorted array
 */
export function sortByVersion<T extends { version: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => compareVersions(a.version, b.version));
}