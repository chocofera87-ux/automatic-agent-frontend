import { Navbar } from '@/components/dashboard/Navbar';
import { weeklyStats, hourlyDistribution, overviewStats, statusBreakdown } from '@/data/analyticsData';
import { formatPrice } from '@/utils/formatters';
import { TrendingUp, DollarSign, CheckCircle, Clock, Zap, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard
            icon={TrendingUp}
            label="Total Rides"
            value={overviewStats.totalRides}
            sublabel="This week"
            trend="+12%"
            trendUp
          />
          <MetricCard
            icon={DollarSign}
            label="Revenue"
            value={formatPrice(overviewStats.totalRevenue)}
            sublabel="This week"
            trend="+8%"
            trendUp
          />
          <MetricCard
            icon={CheckCircle}
            label="Success Rate"
            value={`${overviewStats.avgSuccessRate}%`}
            sublabel="Avg"
            trend="+2%"
            trendUp
          />
          <MetricCard
            icon={Clock}
            label="Response Time"
            value={overviewStats.avgResponseTime}
            sublabel="Average"
          />
          <MetricCard
            icon={Zap}
            label="Peak Hours"
            value={overviewStats.peakHour}
            sublabel="Busiest"
          />
          <MetricCard
            icon={Trophy}
            label="Top Driver"
            value={overviewStats.topDriver.split(' ')[0]}
            sublabel="This week"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Rides Chart */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-4">Weekly Ride Volume</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyStats}>
                  <defs>
                    <linearGradient id="rideGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="rides"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#rideGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-4">Weekly Revenue</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value: number) => [`$${value}`, 'Revenue']}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="hsl(var(--status-accepted))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Second Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hourly Distribution */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-4">Hourly Distribution</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="hour"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar
                    dataKey="rides"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Breakdown */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-4">Ride Outcomes</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {statusBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

function MetricCard({ icon: Icon, label, value, sublabel, trend, trendUp }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sublabel: string;
  trend?: string;
  trendUp?: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        {trend && (
          <span className={cn(
            'text-xs font-medium',
            trendUp ? 'text-status-accepted' : 'text-status-failed'
          )}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-xl font-semibold truncate">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default Analytics;
