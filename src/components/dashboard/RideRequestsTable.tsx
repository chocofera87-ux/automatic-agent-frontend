import { RideRequest } from '@/types/rides';
import { StatusBadge } from './StatusBadge';
import { formatTimestamp, formatPrice, formatPhoneNumber, truncateText } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { FileText, MapPin, Navigation } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface RideRequestsTableProps {
  rides: RideRequest[];
  onViewLogs: (rideId: string) => void;
  isLoading?: boolean;
}

export function RideRequestsTable({ rides, onViewLogs, isLoading }: RideRequestsTableProps) {
  if (isLoading) {
    return <RideRequestsTableSkeleton />;
  }

  if (rides.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Ride ID</TableHead>
            <TableHead className="font-semibold">Route</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Time</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.map((ride, index) => (
            <TableRow
              key={ride.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-medium">{ride.id}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatPhoneNumber(ride.phoneNumber)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1 max-w-[250px]">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-3.5 h-3.5 text-status-accepted flex-shrink-0" />
                    <span className="truncate" title={ride.pickupLocation}>
                      {truncateText(ride.pickupLocation, 30)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Navigation className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="truncate" title={ride.dropoffLocation}>
                      {truncateText(ride.dropoffLocation, 30)}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-mono font-medium">
                  {formatPrice(ride.estimatedPrice)}
                </span>
              </TableCell>
              <TableCell>
                <StatusBadge status={ride.status} />
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {formatTimestamp(ride.timestamp)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewLogs(ride.id)}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <FileText className="w-4 h-4" />
                  View Logs
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function RideRequestsTableSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Ride ID</TableHead>
            <TableHead className="font-semibold">Route</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Time</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-8 w-24 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-card border border-border rounded-lg p-12 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <FileText className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">No ride requests found</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        When customers request rides via WhatsApp, they'll appear here. 
        Try adjusting your filters or wait for new requests.
      </p>
    </div>
  );
}
