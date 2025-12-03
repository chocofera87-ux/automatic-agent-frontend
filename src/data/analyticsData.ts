export interface DailyStats {
  date: string;
  rides: number;
  revenue: number;
  successRate: number;
}

export interface HourlyDistribution {
  hour: string;
  rides: number;
}

export const weeklyStats: DailyStats[] = [
  { date: 'Mon', rides: 45, revenue: 1125, successRate: 82 },
  { date: 'Tue', rides: 52, revenue: 1340, successRate: 88 },
  { date: 'Wed', rides: 48, revenue: 1180, successRate: 85 },
  { date: 'Thu', rides: 61, revenue: 1520, successRate: 91 },
  { date: 'Fri', rides: 78, revenue: 2010, successRate: 87 },
  { date: 'Sat', rides: 92, revenue: 2580, successRate: 89 },
  { date: 'Sun', rides: 67, revenue: 1720, successRate: 84 },
];

export const hourlyDistribution: HourlyDistribution[] = [
  { hour: '6am', rides: 8 },
  { hour: '8am', rides: 25 },
  { hour: '10am', rides: 18 },
  { hour: '12pm', rides: 32 },
  { hour: '2pm', rides: 22 },
  { hour: '4pm', rides: 28 },
  { hour: '6pm', rides: 45 },
  { hour: '8pm', rides: 38 },
  { hour: '10pm', rides: 20 },
];

export const overviewStats = {
  totalRides: weeklyStats.reduce((sum, d) => sum + d.rides, 0),
  totalRevenue: weeklyStats.reduce((sum, d) => sum + d.revenue, 0),
  avgSuccessRate: Math.round(weeklyStats.reduce((sum, d) => sum + d.successRate, 0) / weeklyStats.length),
  avgResponseTime: '2.3 min',
  peakHour: '6pm - 8pm',
  topDriver: 'Sofia Hernandez',
};

export const statusBreakdown = [
  { name: 'Completed', value: 385, color: 'hsl(var(--status-accepted))' },
  { name: 'No Driver', value: 42, color: 'hsl(var(--status-no-driver))' },
  { name: 'Cancelled', value: 16, color: 'hsl(var(--status-failed))' },
];
