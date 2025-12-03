import { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { mockDrivers, driverStats, Driver } from '@/data/driversData';
import { formatRelativeTime, formatPrice, formatPhoneNumber } from '@/utils/formatters';
import { Car, Users, UserCheck, UserX, Star, Phone, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const statusConfig = {
  available: { label: 'Available', className: 'bg-status-accepted/10 text-status-accepted border-status-accepted/20' },
  busy: { label: 'On Ride', className: 'bg-status-requested/10 text-status-requested border-status-requested/20' },
  offline: { label: 'Offline', className: 'bg-muted text-muted-foreground border-border' },
};

const vehicleIcons = {
  sedan: '🚗',
  suv: '🚙',
  van: '🚐',
  motorcycle: '🏍️',
};

const Drivers = () => {
  const [search, setSearch] = useState('');

  const filteredDrivers = mockDrivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.id.toLowerCase().includes(search.toLowerCase()) ||
    d.phone.includes(search)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Total Drivers"
            value={driverStats.total}
            className="text-foreground"
          />
          <StatCard
            icon={UserCheck}
            label="Available"
            value={driverStats.available}
            className="text-status-accepted"
          />
          <StatCard
            icon={Car}
            label="On Ride"
            value={driverStats.busy}
            className="text-status-requested"
          />
          <StatCard
            icon={Star}
            label="Avg Rating"
            value={driverStats.avgRating}
            className="text-status-no-driver"
          />
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search drivers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Drivers Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold">Driver</TableHead>
                <TableHead className="font-semibold">Vehicle</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Rating</TableHead>
                <TableHead className="font-semibold">Rides</TableHead>
                <TableHead className="font-semibold">Earnings</TableHead>
                <TableHead className="font-semibold">Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver, index) => (
                <TableRow
                  key={driver.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{driver.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {driver.id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{vehicleIcons[driver.vehicleType]}</span>
                      <div className="flex flex-col">
                        <span className="text-sm capitalize">{driver.vehicleType}</span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {driver.vehiclePlate}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DriverStatusBadge status={driver.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-status-no-driver fill-status-no-driver" />
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono">{driver.totalRides}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono font-medium">
                      {formatPrice(driver.earnings)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {formatRelativeTime(driver.lastActive)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredDrivers.length === 0 && (
            <div className="py-12 text-center">
              <UserX className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No drivers found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

function StatCard({ icon: Icon, label, value, className }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className={cn('p-2 rounded-lg bg-muted', className)}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}

function DriverStatusBadge({ status }: { status: Driver['status'] }) {
  const config = statusConfig[status];
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      config.className
    )}>
      {config.label}
    </span>
  );
}

export default Drivers;
