import { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { RideRequestsTable } from '@/components/dashboard/RideRequestsTable';
import { LogViewer } from '@/components/dashboard/LogViewer';
import { EventFeed } from '@/components/dashboard/EventFeed';
import { SpaceBackground } from '@/components/dashboard/SpaceBackground';
import { ConversationsPanel } from '@/components/dashboard/ConversationsPanel';
import { getRides, getRideLogs, getRecentEvents, type RideData, type LogEntry } from '@/lib/api';
import { RideRequest, RideStatus, LogEntry as LocalLogEntry, ApiEvent } from '@/types/rides';
import { toast } from 'sonner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RideStatus | 'all'>('all');
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
  const [rides, setRides] = useState<RideRequest[]>([]);
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [selectedLogs, setSelectedLogs] = useState<LocalLogEntry[]>([]);
  const [useApi, setUseApi] = useState(true);

  // Transform API data to local format
  const transformRide = (apiRide: RideData): RideRequest => ({
    id: apiRide.id,
    pickupLocation: apiRide.pickupLocation,
    dropoffLocation: apiRide.dropoffLocation,
    estimatedPrice: apiRide.estimatedPrice || apiRide.finalPrice || 0,
    status: apiRide.status as RideStatus,
    timestamp: new Date(apiRide.timestamp),
    phoneNumber: apiRide.phoneNumber,
    driverName: apiRide.driverName || undefined,
  });

  const transformEvent = (apiEvent: any): ApiEvent => ({
    id: apiEvent.id,
    rideId: apiEvent.rideId,
    type: apiEvent.type as ApiEvent['type'],
    title: apiEvent.title,
    description: apiEvent.description || '',
    timestamp: new Date(apiEvent.timestamp),
    metadata: apiEvent.metadata,
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (useApi) {
        // Fetch from API
        const [ridesResponse, eventsResponse] = await Promise.all([
          getRides({ limit: 50 }),
          getRecentEvents(20),
        ]);

        if (ridesResponse.success && ridesResponse.data) {
          setRides(ridesResponse.data.map(transformRide));
        }

        if (eventsResponse.success && eventsResponse.data) {
          setEvents(eventsResponse.data.map(transformEvent));
        }

        toast.success('Dados atualizados', {
          description: `${ridesResponse.data?.length || 0} corridas carregadas`,
        });
      } else {
        // Use mock data as fallback
        const { mockRideRequests, mockEvents } = await import('@/data/mockData');
        setRides(mockRideRequests);
        setEvents(mockEvents);
        toast.info('Usando dados de demonstração');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Fallback to mock data
      setUseApi(false);
      const { mockRideRequests, mockEvents } = await import('@/data/mockData');
      setRides(mockRideRequests);
      setEvents(mockEvents);
      toast.warning('API indisponível', {
        description: 'Usando dados de demonstração',
      });
    } finally {
      setIsLoading(false);
    }
  }, [useApi]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredRides = useMemo(() => {
    return rides.filter((ride) => {
      const matchesSearch =
        searchQuery === '' ||
        ride.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ride.phoneNumber.includes(searchQuery) ||
        ride.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ride.dropoffLocation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || ride.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rides, searchQuery, statusFilter]);

  const selectedRide = rides.find((r) => r.id === selectedRideId) || null;

  const handleRefresh = () => {
    fetchData();
  };

  const handleViewLogs = async (rideId: string) => {
    setSelectedRideId(rideId);

    if (useApi) {
      try {
        const response = await getRideLogs(rideId);
        if (response.success && response.data) {
          setSelectedLogs(
            response.data.map((log) => ({
              id: log.id,
              rideId: log.rideId,
              type: log.type,
              content: log.content,
              timestamp: new Date(log.timestamp),
              direction: log.direction as any,
              severity: log.severity as any,
            }))
          );
        }
      } catch (error) {
        console.error('Failed to fetch logs:', error);
        // Fallback to mock logs
        const { getLogsForRide } = await import('@/data/mockData');
        setSelectedLogs(getLogsForRide(rideId));
      }
    } else {
      const { getLogsForRide } = await import('@/data/mockData');
      setSelectedLogs(getLogsForRide(rideId));
    }
  };

  const handleSelectConversation = (conversationId: string) => {
    // Could navigate to conversation details or show in modal
    toast.info('Conversa selecionada', {
      description: `ID: ${conversationId.slice(0, 8)}...`,
    });
  };

  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-sm">
      <SpaceBackground />
      <Navbar onRefresh={handleRefresh} isLoading={isLoading} />

      <main className="container mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fade-in">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main content - Rides table */}
          <div className="xl:col-span-2">
            <RideRequestsTable
              rides={filteredRides}
              onViewLogs={handleViewLogs}
              isLoading={isLoading}
            />
          </div>

          {/* Right side - Conversations */}
          <div className="xl:col-span-1">
            <ConversationsPanel
              onSelectConversation={handleSelectConversation}
              className="h-full"
            />
          </div>

          {/* Event feed */}
          <div className="xl:col-span-1">
            <EventFeed events={events} isLoading={isLoading} />
          </div>
        </div>
      </main>

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
