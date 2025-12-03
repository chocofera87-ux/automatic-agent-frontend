import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/dashboard/Header';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { RideRequestsTable } from '@/components/dashboard/RideRequestsTable';
import { LogViewer } from '@/components/dashboard/LogViewer';
import { EventFeed } from '@/components/dashboard/EventFeed';
import { mockRideRequests, mockEvents, getLogsForRide } from '@/data/mockData';
import { RideRequest, RideStatus, LogEntry } from '@/types/rides';
import { toast } from 'sonner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RideStatus | 'all'>('all');
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
  const [rides, setRides] = useState<RideRequest[]>([]);

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setRides(mockRideRequests);
      setIsLoading(false);
      toast.success('Dashboard loaded', {
        description: `${mockRideRequests.length} ride requests found`,
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Filter rides based on search and status
  const filteredRides = useMemo(() => {
    return rides.filter((ride) => {
      const matchesSearch =
        searchQuery === '' ||
        ride.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ride.phoneNumber.includes(searchQuery);

      const matchesStatus = statusFilter === 'all' || ride.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rides, searchQuery, statusFilter]);

  // Get selected ride and its logs
  const selectedRide = rides.find((r) => r.id === selectedRideId) || null;
  const selectedLogs: LogEntry[] = selectedRideId ? getLogsForRide(selectedRideId) : [];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setRides(mockRideRequests);
      setIsLoading(false);
      toast.info('Data refreshed');
    }, 800);
  };

  const handleViewLogs = (rideId: string) => {
    setSelectedRideId(rideId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onRefresh={handleRefresh} isLoading={isLoading} />

      <main className="container mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ride Requests Table - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <RideRequestsTable
              rides={filteredRides}
              onViewLogs={handleViewLogs}
              isLoading={isLoading}
            />
          </div>

          {/* Event Feed - Takes 1 column */}
          <div className="lg:col-span-1">
            <EventFeed events={mockEvents} isLoading={isLoading} />
          </div>
        </div>
      </main>

      {/* Log Viewer Drawer */}
      <LogViewer
        ride={selectedRide}
        logs={selectedLogs}
        isOpen={!!selectedRideId}
        onClose={() => setSelectedRideId(null)}
      />
    </div>
  );
};

export default Index;
