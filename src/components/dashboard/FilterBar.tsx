import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RideStatus } from '@/types/rides';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: RideStatus | 'all';
  onStatusFilterChange: (value: RideStatus | 'all') => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 bg-card border border-border rounded-xl shadow-sm">
      {/* Filter Label */}
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground sm:border-r sm:border-border sm:pr-4">
        <SlidersHorizontal className="w-4 h-4 text-[#FFCC00]" />
        <span className="hidden sm:inline">Filtros</span>
      </div>

      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por ID ou telefone..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-background border-border focus:border-[#FFCC00] focus:ring-[#FFCC00]/20"
        />
      </div>

      {/* Status Filter */}
      <div className="flex gap-3">
        <Select
          value={statusFilter}
          onValueChange={(value) => onStatusFilterChange(value as RideStatus | 'all')}
        >
          <SelectTrigger className="w-[180px] bg-background border-border hover:border-[#FFCC00]/50 focus:border-[#FFCC00] focus:ring-[#FFCC00]/20">
            <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                Todos os Status
              </span>
            </SelectItem>
            <SelectItem value="requested">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Solicitado
              </span>
            </SelectItem>
            <SelectItem value="accepted">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Aceito
              </span>
            </SelectItem>
            <SelectItem value="no-driver">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                Sem Motorista
              </span>
            </SelectItem>
            <SelectItem value="failed">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Falhou
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
