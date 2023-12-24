export const secret = {
  SERVER_API_URL: import.meta.env.VITE_SERVER_URL,
  CLIENT_API_URL: import.meta.env.VITE_CLIENT_URL,
  GOOGLE_AUTH_CLIENT_ID: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
  //cloudinary profile upload settings
  PROFILE_CLOUDINARY_PRESET: import.meta.env.VITE_PROFILE_CLOUDINARY_PRESET,
  PROFILE_CLOUDINARY_NAME: import.meta.env.VITE_PROFILE_CLOUDINARY_NAME,
  //cloudinary banner upload settings
  BANNER_CLOUDINARY_PRESET: import.meta.env.VITE_BANNER_CLOUDINARY_PRESET,
  BANNER_CLOUDINARY_NAME: import.meta.env.VITE_BANNER_CLOUDINARY_NAME,
  //cloudinary post upload settings
  POST_CLOUDINARY_PRESET: import.meta.env.VITE_POST_CLOUDINARY_PRESET,
  POST_CLOUDINARY_NAME: import.meta.env.VITE_POST_CLOUDINARY_NAME,
};
