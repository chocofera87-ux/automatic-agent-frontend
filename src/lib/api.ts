// API Client for Mi Chame Backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

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
