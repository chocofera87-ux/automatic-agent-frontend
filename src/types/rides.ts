export type RideStatus = 'requested' | 'accepted' | 'no-driver' | 'failed';

export type EventType = 'info' | 'success' | 'warning' | 'error';

export type MessageDirection = 'incoming' | 'outgoing';

export interface RideRequest {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  estimatedPrice: number;
  status: RideStatus;
  timestamp: Date;
  phoneNumber: string;
  driverName?: string;
}

export interface WhatsAppMessage {
  id: string;
  rideId: string;
  direction: MessageDirection;
  content: string;
  timestamp: Date;
  phoneNumber: string;
}

export interface ApiEvent {
  id: string;
  rideId?: string;
  type: EventType;
  title: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, string>;
}

export interface LogEntry {
  id: string;
  rideId: string;
  type: 'message' | 'api' | 'error';
  content: string;
  timestamp: Date;
  direction?: MessageDirection;
  severity?: EventType;
}
