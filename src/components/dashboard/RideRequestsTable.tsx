import { RideRequest } from '@/types/rides';
import { StatusBadge } from './StatusBadge';
import { formatTimestamp, formatPrice, formatPhoneNumber, truncateText } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { FileText, Car, MoreHorizontal, Phone, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

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
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Table Header with Mi Chame accent */}
      <div className="bg-gradient-to-r from-[#FFCC00]/10 to-transparent border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-[#FFCC00]" />
            <h3 className="font-semibold text-sm">Corridas Recentes</h3>
            <span className="px-2 py-0.5 bg-[#FFCC00]/20 text-[#FFCC00] text-xs font-medium rounded-full">
              {rides.length}
            </span>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Corrida</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Rota</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Preço</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Horário</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.map((ride, index) => (
            <TableRow
              key={ride.id}
              className={cn(
                "animate-fade-in transition-colors",
                "hover:bg-[#FFCC00]/5",
                index % 2 === 0 ? "bg-transparent" : "bg-muted/20"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FFCC00]/10 flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-[#FFCC00]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-sm font-semibold text-foreground">{ride.id}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      {formatPhoneNumber(ride.phoneNumber)}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex flex-col gap-1.5 max-w-[280px]">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="truncate font-medium" title={ride.pickupLocation}>
                      {truncateText(ride.pickupLocation, 35)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-[#FFCC00] flex-shrink-0" />
                    <span className="truncate" title={ride.dropoffLocation}>
                      {truncateText(ride.dropoffLocation, 35)}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex flex-col">
                  <span className="font-mono font-bold text-foreground">
                    {formatPrice(ride.estimatedPrice)}
                  </span>
                  <span className="text-xs text-muted-foreground">estimado</span>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <StatusBadge status={ride.status} />
              </TableCell>
              <TableCell className="py-4">
                <span className="text-sm text-muted-foreground">
                  {formatTimestamp(ride.timestamp)}
                </span>
              </TableCell>
              <TableCell className="py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-[#FFCC00]/10"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => onViewLogs(ride.id)} className="gap-2">
                      <Eye className="w-4 h-4" />
                      Ver Logs
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <FileText className="w-4 h-4" />
                      Detalhes
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Table Header Skeleton */}
      <div className="bg-gradient-to-r from-[#FFCC00]/10 to-transparent border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-8 rounded-full" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Corrida</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Rota</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Preço</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Horário</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className={i % 2 === 0 ? "bg-transparent" : "bg-muted/20"}>
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-2 h-2 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-2 h-2 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </TableCell>
              <TableCell className="py-4">
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell className="py-4">
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="py-4 text-right">
                <Skeleton className="h-8 w-8 rounded-md ml-auto" />
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
    <div className="bg-card border border-border rounded-xl p-12 text-center shadow-sm">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-2xl bg-[#FFCC00]/10 flex items-center justify-center">
          <Car className="w-8 h-8 text-[#FFCC00]" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma corrida encontrada</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
        Quando clientes solicitarem corridas via WhatsApp, elas aparecerão aqui.
        Tente ajustar os filtros ou aguarde novas solicitações.
      </p>
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
        <span>Aguardando corridas...</span>
      </div>
    </div>
  );
}
