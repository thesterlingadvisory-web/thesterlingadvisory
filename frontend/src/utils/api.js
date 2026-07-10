export const getApiUrl = (endpoint) => {
  // If VITE_API_URL environment variable is explicitly defined, use it
  if (import.meta.env.VITE_API_URL) {
    return `${import.meta.env.VITE_API_URL}${endpoint}`;
  }
  // If running locally during development, use local Express backend on port 5000
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return `http://localhost:5000${endpoint}`;
  }
  // If deployed together on Render (where backend serves frontend & API on the same origin), use relative path
  if (window.location.hostname.includes('onrender.com')) {
    return endpoint;
  }
  // If deployed on Vercel or any external CDN, point to the live Render API server
  return `https://thesterlingadvisory-api.onrender.com${endpoint}`;
};
