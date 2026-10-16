import { API_BASE_URL } from '../config/api';

const BACKEND_URL = API_BASE_URL;

export function getImageUrl(imagePath?: string | null): string {
  if (!imagePath) return '';
  
  // If already a full Cloudinary or web URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Clean leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Fallback for local files served by backend
  return `${BACKEND_URL}/images/${cleanPath}`;
}

