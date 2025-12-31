/**
 * Authentication utilities for admin panel
 */

export interface AdminCredentials {
  username: string;
  password: string;
}

// Default credentials for development
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin123'
};

/**
 * Verify admin credentials
 */
export function verifyAdmin(username: string, password: string): boolean {
  const adminUsername = process.env.ADMIN_USERNAME || DEFAULT_ADMIN.username;
  const adminPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN.password;
  
  return username === adminUsername && password === adminPassword;
}

/**
 * Check if user is authenticated via cookie
 */
export function isAuthenticated(cookieHeader: string | null): boolean {
  const token = getTokenFromCookie(cookieHeader);
  if (!token) return false;
  return validateSessionToken(token);
}

/**
 * Generate session token
 */
export function generateSessionToken(): string {
  return 'admin_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Validate session token
 */
export function validateSessionToken(token: string): boolean {
  return token.startsWith('admin_');
}

/**
 * Extract token from cookie header
 */
export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'admin-auth') {
      return value;
    }
  }
  return null;
}