import { RideRequest, ApiEvent, LogEntry } from '@/types/rides';

const now = new Date();
const minutesAgo = (mins: number) => new Date(now.getTime() - mins * 60000);
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 3600000);

export const mockRideRequests: RideRequest[] = [
  {
    id: 'RIDE-001',
    pickupLocation: '123 Main Street, Downtown',
    dropoffLocation: 'Airport Terminal 2',
    estimatedPrice: 45.50,
    status: 'accepted',
    timestamp: minutesAgo(5),
    phoneNumber: '+1234567890',
    driverName: 'Carlos M.',
  },
  {
    id: 'RIDE-002',
    pickupLocation: 'Central Park West',
    dropoffLocation: '456 Broadway, Midtown',
    estimatedPrice: 22.00,
    status: 'requested',
    timestamp: minutesAgo(12),
    phoneNumber: '+1987654321',
  },
  {
    id: 'RIDE-003',
    pickupLocation: 'Grand Central Station',
    dropoffLocation: 'Brooklyn Bridge',
    estimatedPrice: 35.75,
    status: 'no-driver',
    timestamp: minutesAgo(28),
    phoneNumber: '+1555666777',
  },
  {
    id: 'RIDE-004',
    pickupLocation: '789 Oak Avenue',
    dropoffLocation: 'University Campus',
    estimatedPrice: 18.25,
    status: 'failed',
    timestamp: hoursAgo(1),
    phoneNumber: '+1444333222',
  },
  {
    id: 'RIDE-005',
    pickupLocation: 'Shopping Mall Plaza',
    dropoffLocation: 'Residential District 5',
    estimatedPrice: 28.00,
    status: 'accepted',
    timestamp: hoursAgo(2),
    phoneNumber: '+1666999888',
    driverName: 'Maria L.',
  },
  {
    id: 'RIDE-006',
    pickupLocation: 'Tech Park Building A',
    dropoffLocation: 'Financial District',
    estimatedPrice: 32.50,
    status: 'requested',
    timestamp: minutesAgo(3),
    phoneNumber: '+1222111000',
  },
];

export const mockEvents: ApiEvent[] = [
  {
    id: 'EVT-001',
    rideId: 'RIDE-001',
    type: 'success',
    title: 'Driver Assigned',
    description: 'Carlos M. accepted the ride request',
    timestamp: minutesAgo(4),
    metadata: { driverId: 'DRV-042', vehicleType: 'sedan' },
  },
  {
    id: 'EVT-002',
    type: 'info',
    title: 'New Ride Request',
    description: 'Incoming ride request from +1222111000',
    timestamp: minutesAgo(3),
    rideId: 'RIDE-006',
  },
  {
    id: 'EVT-003',
    rideId: 'RIDE-003',
    type: 'warning',
    title: 'No Available Drivers',
    description: 'All nearby drivers are currently busy',
    timestamp: minutesAgo(25),
  },
  {
    id: 'EVT-004',
    rideId: 'RIDE-004',
    type: 'error',
    title: 'Payment Failed',
    description: 'Card declined - insufficient funds',
    timestamp: hoursAgo(1),
    metadata: { errorCode: 'CARD_DECLINED', gateway: 'stripe' },
  },
  {
    id: 'EVT-005',
    type: 'info',
    title: 'WhatsApp Webhook Connected',
    description: 'Successfully receiving messages from Meta API',
    timestamp: hoursAgo(3),
  },
  {
    id: 'EVT-006',
    rideId: 'RIDE-002',
    type: 'info',
    title: 'Searching for Driver',
    description: 'Broadcasting to 12 nearby drivers',
    timestamp: minutesAgo(11),
  },
];

export const mockLogs: Record<string, LogEntry[]> = {
  'RIDE-001': [
    {
      id: 'LOG-001',
      rideId: 'RIDE-001',
      type: 'message',
      direction: 'incoming',
      content: 'Hi, I need a ride to the airport',
      timestamp: minutesAgo(8),
    },
    {
      id: 'LOG-002',
      rideId: 'RIDE-001',
      type: 'message',
      direction: 'outgoing',
      content: 'Sure! Please share your pickup location.',
      timestamp: minutesAgo(7),
    },
    {
      id: 'LOG-003',
      rideId: 'RIDE-001',
      type: 'message',
      direction: 'incoming',
      content: '123 Main Street, Downtown',
      timestamp: minutesAgo(6),
    },
    {
      id: 'LOG-004',
      rideId: 'RIDE-001',
      type: 'api',
      content: 'Geocoding API: Location resolved',
      timestamp: minutesAgo(6),
      severity: 'success',
    },
    {
      id: 'LOG-005',
      rideId: 'RIDE-001',
      type: 'message',
      direction: 'outgoing',
      content: 'Your ride to Airport Terminal 2 will cost approximately $45.50. Confirm?',
      timestamp: minutesAgo(5),
    },
    {
      id: 'LOG-006',
      rideId: 'RIDE-001',
      type: 'message',
      direction: 'incoming',
      content: 'Yes, confirm',
      timestamp: minutesAgo(5),
    },
    {
      id: 'LOG-007',
      rideId: 'RIDE-001',
      type: 'api',
      content: 'Driver matching: Carlos M. assigned',
      timestamp: minutesAgo(4),
      severity: 'success',
    },
    {
      id: 'LOG-008',
      rideId: 'RIDE-001',
      type: 'message',
      direction: 'outgoing',
      content: 'Great! Carlos M. is on the way. ETA: 7 minutes.',
      timestamp: minutesAgo(4),
    },
  ],
  'RIDE-004': [
    {
      id: 'LOG-101',
      rideId: 'RIDE-004',
      type: 'message',
      direction: 'incoming',
      content: 'Need a ride to University Campus',
      timestamp: hoursAgo(1.2),
    },
    {
      id: 'LOG-102',
      rideId: 'RIDE-004',
      type: 'api',
      content: 'Payment processing initiated',
      timestamp: hoursAgo(1.1),
      severity: 'info',
    },
    {
      id: 'LOG-103',
      rideId: 'RIDE-004',
      type: 'error',
      content: 'Stripe API Error: Card declined (insufficient_funds)',
      timestamp: hoursAgo(1),
      severity: 'error',
    },
    {
      id: 'LOG-104',
      rideId: 'RIDE-004',
      type: 'message',
      direction: 'outgoing',
      content: 'Sorry, your payment could not be processed. Please update your payment method.',
      timestamp: hoursAgo(1),
    },
  ],
};

export function getLogsForRide(rideId: string): LogEntry[] {
  return mockLogs[rideId] || [];
}
