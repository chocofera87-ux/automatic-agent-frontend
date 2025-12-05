// API Client for Mi Chame Backend

// Remove trailing slash from API URL to prevent double slashes
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

// Token storage keys
const ACCESS_TOKEN_KEY = 'michame_access_token';
const REFRESH_TOKEN_KEY = 'michame_refresh_token';
const USER_KEY = 'michame_user';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Get stored access token
export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

// Get stored refresh token
export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

// Store tokens
export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

// Clear tokens
export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// Store user data
export function setStoredUser(user: AuthUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Get stored user
export function getStoredUser(): AuthUser | null {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  includeAuth: boolean = true
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add auth token if available and requested
    if (includeAuth) {
      const token = getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized - try to refresh token
    if (response.status === 401 && includeAuth) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Retry the request with new token
        headers['Authorization'] = `Bearer ${getAccessToken()}`;
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers,
        });
        return await retryResponse.json();
      } else {
        // Refresh failed, clear tokens and redirect to login
        clearTokens();
        window.location.href = '/login';
        return { success: false, error: 'Session expired' };
      }
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.message || 'Network error',
    };
  }
}

// Refresh access token
async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();
    if (data.success && data.data?.accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// =====================================================
// Rides API
// =====================================================

export interface RideData {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  estimatedPrice: number | null;
  finalPrice: number | null;
  status: string;
  timestamp: string;
  phoneNumber: string;
  customerName: string | null;
  driverName: string | null;
  driverPhone: string | null;
  driverVehicle: string | null;
  driverPlate: string | null;
  category: string;
  machineRideId: string | null;
  events: Array<{
    id: string;
    eventType: string;
    title: string;
    description: string | null;
    createdAt: string;
  }>;
}

export interface LogEntry {
  id: string;
  rideId: string;
  type: 'message' | 'api' | 'error';
  content: string;
  timestamp: string;
  direction?: string;
  severity?: string;
}

export async function getRides(params?: {
  status?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<RideData[]>> {
  const query = new URLSearchParams();
  if (params?.status) query.set('status', params.status);
  if (params?.page) query.set('page', params.page.toString());
  if (params?.limit) query.set('limit', params.limit.toString());

  return fetchApi<RideData[]>(`/api/rides?${query}`);
}

export async function getRide(id: string): Promise<ApiResponse<RideData>> {
  return fetchApi<RideData>(`/api/rides/${id}`);
}

export async function getRideLogs(id: string): Promise<ApiResponse<LogEntry[]>> {
  return fetchApi<LogEntry[]>(`/api/rides/${id}/logs`);
}

export async function refreshRide(id: string): Promise<ApiResponse<RideData>> {
  return fetchApi<RideData>(`/api/rides/${id}/refresh`, { method: 'POST' });
}

export async function cancelRide(id: string, reason?: string): Promise<ApiResponse<RideData>> {
  return fetchApi<RideData>(`/api/rides/${id}/cancel`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  });
}

// =====================================================
// Conversations API
// =====================================================

export interface ConversationData {
  id: string;
  customer: {
    id: string;
    phoneNumber: string;
    name: string | null;
  };
  state: string;
  isActive: boolean;
  lastMessage: {
    id: string;
    content: string;
    direction: string;
    createdAt: string;
  } | null;
  lastMessageAt: string;
  hasActiveRide: boolean;
  rideId: string | null;
  rideStatus: string | null;
  createdAt: string;
}

export interface MessageData {
  id: string;
  conversationId: string;
  direction: string;
  content: string;
  messageType: string;
  createdAt: string;
}

export async function getConversations(params?: {
  active?: boolean;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<ConversationData[]>> {
  const query = new URLSearchParams();
  if (params?.active !== undefined) query.set('active', params.active.toString());
  if (params?.page) query.set('page', params.page.toString());
  if (params?.limit) query.set('limit', params.limit.toString());

  return fetchApi<ConversationData[]>(`/api/conversations?${query}`);
}

export async function getConversation(id: string): Promise<ApiResponse<any>> {
  return fetchApi<any>(`/api/conversations/${id}`);
}

export async function getConversationMessages(id: string): Promise<ApiResponse<MessageData[]>> {
  return fetchApi<MessageData[]>(`/api/conversations/${id}/messages`);
}

export async function getConversationStats(): Promise<ApiResponse<{
  activeConversations: number;
  conversationsToday: number;
  messagesToday: number;
}>> {
  return fetchApi<any>('/api/conversations/stats/active');
}

// =====================================================
// Analytics API
// =====================================================

export interface AnalyticsOverview {
  rides: {
    total: number;
    today: number;
    week: number;
    month: number;
    active: number;
    completed: number;
    cancelled: number;
    completionRate: string;
    cancellationRate: string;
  };
  revenue: {
    today: number;
    week: number;
    month: number;
  };
  customers: {
    total: number;
  };
  conversations: {
    active: number;
  };
}

export interface DayData {
  date: string;
  rides: number;
  completed: number;
  revenue: number;
}

export async function getAnalyticsOverview(): Promise<ApiResponse<AnalyticsOverview>> {
  return fetchApi<AnalyticsOverview>('/api/analytics/overview');
}

export async function getRidesByDay(days?: number): Promise<ApiResponse<DayData[]>> {
  const query = days ? `?days=${days}` : '';
  return fetchApi<DayData[]>(`/api/analytics/rides-by-day${query}`);
}

export async function getRidesByStatus(): Promise<ApiResponse<Array<{ status: string; count: number }>>> {
  return fetchApi<any>('/api/analytics/rides-by-status');
}

export async function getRidesByCategory(): Promise<ApiResponse<Array<{ category: string; count: number }>>> {
  return fetchApi<any>('/api/analytics/rides-by-category');
}

export async function getRecentEvents(limit?: number): Promise<ApiResponse<Array<{
  id: string;
  rideId: string;
  type: string;
  title: string;
  description: string | null;
  timestamp: string;
  customerPhone: string | null;
  customerName: string | null;
}>>> {
  const query = limit ? `?limit=${limit}` : '';
  return fetchApi<any>(`/api/analytics/recent-events${query}`);
}

// =====================================================
// Settings API
// =====================================================

export interface HealthStatus {
  status: string;
  services: {
    database: { status: string };
    machineGlobal: { status: string };
    whatsapp: { status: string };
    twilio: { status: string };
    openai: { status: string };
  };
  timestamp: string;
}

export async function getHealth(): Promise<ApiResponse<HealthStatus>> {
  return fetchApi<HealthStatus>('/api/settings/health');
}

export async function getWebhooks(): Promise<ApiResponse<any>> {
  return fetchApi<any>('/api/settings/webhooks');
}

export async function testWhatsApp(phoneNumber: string, message?: string): Promise<ApiResponse<any>> {
  return fetchApi<any>('/api/settings/test/whatsapp', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber, message }),
  });
}

export async function testMachineGlobal(): Promise<ApiResponse<{ success: boolean; message: string }>> {
  return fetchApi<any>('/api/settings/test/machine', { method: 'POST' });
}

export async function getEnvInfo(): Promise<ApiResponse<any>> {
  return fetchApi<any>('/api/settings/env');
}

// =====================================================
// Credentials API
// =====================================================

export interface CredentialInfo {
  key: string;
  service: string;
  isConfigured: boolean;
  isValid: boolean;
  maskedValue: string;
  lastTest: string | null;
}

export interface CredentialsData {
  credentials: CredentialInfo[];
  grouped: Record<string, CredentialInfo[]>;
  services: string[];
}

export async function getCredentials(): Promise<ApiResponse<CredentialsData>> {
  return fetchApi<CredentialsData>('/api/credentials');
}

export async function getMissingCredentials(): Promise<ApiResponse<{
  missing: string[];
  isComplete: boolean;
  message: string;
}>> {
  return fetchApi<any>('/api/credentials/missing');
}

export async function saveCredentials(
  service: string,
  credentials: Record<string, string>
): Promise<ApiResponse<{ message: string; savedKeys: string[] }>> {
  return fetchApi<any>(`/api/credentials/${service}`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function testCredentials(service: string): Promise<ApiResponse<{
  success: boolean;
  service: string;
  message: string;
  error?: string;
}>> {
  return fetchApi<any>(`/api/credentials/${service}/test`, {
    method: 'POST',
  });
}

export async function deleteCredential(key: string): Promise<ApiResponse<{ message: string }>> {
  return fetchApi<any>(`/api/credentials/${key}`, {
    method: 'DELETE',
  });
}

// =====================================================
// Authentication API
// =====================================================

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'OPERATOR' | 'VIEWER';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive?: boolean;
  lastLoginAt?: string;
  createdAt?: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export async function login(
  email: string,
  password: string
): Promise<ApiResponse<LoginResponse>> {
  const response = await fetchApi<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }, false);

  // Store tokens and user if successful
  if (response.success && response.data) {
    setTokens(response.data.accessToken, response.data.refreshToken);
    setStoredUser(response.data.user);
  }

  return response;
}

export async function logout(): Promise<ApiResponse<void>> {
  const refreshToken = getRefreshToken();
  const response = await fetchApi<void>('/api/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });

  // Clear tokens regardless of response
  clearTokens();

  return response;
}

export async function getCurrentUser(): Promise<ApiResponse<AuthUser>> {
  return fetchApi<AuthUser>('/api/auth/me');
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<ApiResponse<void>> {
  return fetchApi<void>('/api/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

// =====================================================
// User Management API (Admin only)
// =====================================================

export async function getUsers(): Promise<ApiResponse<AuthUser[]>> {
  return fetchApi<AuthUser[]>('/api/auth/users');
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: UserRole
): Promise<ApiResponse<AuthUser>> {
  return fetchApi<AuthUser>('/api/auth/users', {
    method: 'POST',
    body: JSON.stringify({ email, password, name, role }),
  });
}

export async function updateUser(
  userId: string,
  data: { name?: string; email?: string; role?: UserRole; isActive?: boolean }
): Promise<ApiResponse<AuthUser>> {
  return fetchApi<AuthUser>(`/api/auth/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function resetUserPassword(
  userId: string,
  newPassword: string
): Promise<ApiResponse<void>> {
  return fetchApi<void>(`/api/auth/users/${userId}/reset-password`, {
    method: 'POST',
    body: JSON.stringify({ newPassword }),
  });
}

export async function deleteUser(userId: string): Promise<ApiResponse<void>> {
  return fetchApi<void>(`/api/auth/users/${userId}`, {
    method: 'DELETE',
  });
}

export async function setupInitialAdmin(): Promise<ApiResponse<{
  email: string;
  password: string;
  note: string;
}>> {
  return fetchApi<any>('/api/auth/setup', {
    method: 'POST',
  }, false);
}
