/**
 * Dynamic configuration that detects the current hostname
 * and constructs API URLs accordingly
 */

// Get the current hostname (works in both browser and server)
const getCurrentHost = (): string => {
  if (typeof window !== "undefined") {
    // Browser: use current window location
    return window.location.hostname;
  }
  // Server: try to get from env or default to localhost
  return process.env.NEXT_PUBLIC_HOSTNAME || "localhost";
};

// Get the current protocol
const getCurrentProtocol = (): string => {
  if (typeof window !== "undefined") {
    return window.location.protocol.slice(0, -1); // Remove trailing ':'
  }
  return "http";
};

// Construct API URL based on current hostname
export const getApiUrl = (): string => {
  // Always prioritize environment variable if set
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  const hostname = getCurrentHost();
  const protocol = getCurrentProtocol();
  
  // If using IP address or custom hostname, use it
  if (hostname !== "localhost" && hostname !== "127.0.0.1") {
    return `${protocol}://${hostname}:4000/api`;
  }
  
  // Fallback to default localhost
  return "http://localhost:4000/api";
};

// Construct Socket URL based on current hostname
export const getSocketUrl = (): string => {
  // Always prioritize environment variable if set
  if (process.env.NEXT_PUBLIC_SOCKET_URL) {
    return process.env.NEXT_PUBLIC_SOCKET_URL;
  }
  
  const hostname = getCurrentHost();
  const protocol = getCurrentProtocol();
  
  // If using IP address or custom hostname, use it
  if (hostname !== "localhost" && hostname !== "127.0.0.1") {
    return `${protocol}://${hostname}:4000`;
  }
  
  // Fallback to default localhost
  return "http://localhost:4000";
};

// Get base URL for NextAuth (used for callbacks)
export const getBaseUrl = (): string => {
  const hostname = getCurrentHost();
  const protocol = getCurrentProtocol();
  
  if (typeof window !== "undefined") {
    // Browser: use current origin
    return window.location.origin;
  }
  
  // Server: construct from hostname
  if (hostname !== "localhost" && hostname !== "127.0.0.1") {
    return `${protocol}://${hostname}:3000`;
  }
  
  return process.env.NEXTAUTH_URL || "http://localhost:3000";
};

