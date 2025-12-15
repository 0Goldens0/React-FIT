// Utility function to get correct asset paths for GitHub Pages
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `/${cleanPath}`;
}; 