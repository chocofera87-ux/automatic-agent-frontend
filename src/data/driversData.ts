export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleType: 'sedan' | 'suv' | 'van' | 'motorcycle';
  vehiclePlate: string;
  status: 'available' | 'busy' | 'offline';
  rating: number;
  totalRides: number;
  joinedDate: Date;
  lastActive: Date;
  earnings: number;
}

const now = new Date();
const daysAgo = (days: number) => new Date(now.getTime() - days * 86400000);
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 3600000);
const minutesAgo = (mins: number) => new Date(now.getTime() - mins * 60000);

export const mockDrivers: Driver[] = [
  {
    id: 'DRV-001',
    name: 'Carlos Martinez',
    phone: '+1234567001',
    vehicleType: 'sedan',
    vehiclePlate: 'ABC-1234',
    status: 'busy',
    rating: 4.8,
    totalRides: 342,
    joinedDate: daysAgo(180),
    lastActive: minutesAgo(5),
    earnings: 8450.00,
  },
  {
    id: 'DRV-002',
    name: 'Maria Lopez',
    phone: '+1234567002',
    vehicleType: 'suv',
    vehiclePlate: 'XYZ-5678',
    status: 'available',
    rating: 4.9,
    totalRides: 521,
    joinedDate: daysAgo(365),
    lastActive: minutesAgo(2),
    earnings: 12340.50,
  },
  {
    id: 'DRV-003',
    name: 'Juan Rodriguez',
    phone: '+1234567003',
    vehicleType: 'sedan',
    vehiclePlate: 'DEF-9012',
    status: 'available',
    rating: 4.6,
    totalRides: 178,
    joinedDate: daysAgo(90),
    lastActive: minutesAgo(8),
    earnings: 4250.75,
  },
  {
    id: 'DRV-004',
    name: 'Ana Garcia',
    phone: '+1234567004',
    vehicleType: 'van',
    vehiclePlate: 'GHI-3456',
    status: 'offline',
    rating: 4.7,
    totalRides: 289,
    joinedDate: daysAgo(200),
    lastActive: hoursAgo(12),
    earnings: 7120.00,
  },
  {
    id: 'DRV-005',
    name: 'Pedro Sanchez',
    phone: '+1234567005',
    vehicleType: 'motorcycle',
    vehiclePlate: 'JKL-7890',
    status: 'busy',
    rating: 4.5,
    totalRides: 456,
    joinedDate: daysAgo(250),
    lastActive: minutesAgo(15),
    earnings: 5890.25,
  },
  {
    id: 'DRV-006',
    name: 'Sofia Hernandez',
    phone: '+1234567006',
    vehicleType: 'sedan',
    vehiclePlate: 'MNO-1357',
    status: 'available',
    rating: 4.9,
    totalRides: 612,
    joinedDate: daysAgo(400),
    lastActive: minutesAgo(1),
    earnings: 15420.00,
  },
];

export const driverStats = {
  total: mockDrivers.length,
  available: mockDrivers.filter(d => d.status === 'available').length,
  busy: mockDrivers.filter(d => d.status === 'busy').length,
  offline: mockDrivers.filter(d => d.status === 'offline').length,
  avgRating: (mockDrivers.reduce((sum, d) => sum + d.rating, 0) / mockDrivers.length).toFixed(1),
};
