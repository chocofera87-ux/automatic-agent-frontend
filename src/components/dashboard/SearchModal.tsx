import { useState, useEffect, useRef } from 'react';
import { Search, X, Car, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  type: 'ride' | 'customer' | 'driver';
  title: string;
  subtitle: string;
  status?: string;
  timestamp?: string;
}

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectResult?: (result: SearchResult) => void;
}

export function SearchModal({ open, onOpenChange, onSelectResult }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [open]);

  // Mock search - replace with actual API call
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      // Mock results - replace with actual search
      const mockResults: SearchResult[] = [
        {
          id: 'ride-001',
          type: 'ride',
          title: `Corrida #${query.toUpperCase()}`,
          subtitle: 'Centro → Shopping',
          status: 'accepted',
          timestamp: 'Há 5 min',
        },
        {
          id: 'customer-001',
          type: 'customer',
          title: `Cliente: ${query}`,
          subtitle: '+55 19 99999-9999',
        },
        {
          id: 'driver-001',
          type: 'driver',
          title: `Motorista: João`,
          subtitle: 'ABC-1234 • Online',
        },
      ];
      setResults(mockResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      onSelectResult?.(results[selectedIndex]);
      onOpenChange(false);
    } else if (e.key === 'Escape') {
      onOpenChange(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'ride':
        return <Car className="w-4 h-4" />;
      case 'customer':
        return <Phone className="w-4 h-4" />;
      case 'driver':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Buscar</DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar corridas, clientes, motoristas..."
            className="border-0 bg-transparent p-0 h-auto text-base focus-visible:ring-0 placeholder:text-muted-foreground"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 flex-shrink-0"
              onClick={() => setQuery('')}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {!query && (
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#FFCC00]/10 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-[#FFCC00]" />
              </div>
              <p className="text-sm text-muted-foreground">
                Digite para buscar corridas, clientes ou motoristas
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↑↓</kbd>
                  navegar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Enter</kbd>
                  selecionar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Esc</kbd>
                  fechar
                </span>
              </div>
            </div>
          )}

          {query && isSearching && (
            <div className="p-6 text-center">
              <div className="w-6 h-6 border-2 border-[#FFCC00] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Buscando...</p>
            </div>
          )}

          {query && !isSearching && results.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Nenhum resultado encontrado para "{query}"
              </p>
            </div>
          )}

          {query && !isSearching && results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => {
                    onSelectResult?.(result);
                    onOpenChange(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                    index === selectedIndex
                      ? 'bg-[#FFCC00]/10'
                      : 'hover:bg-muted/50'
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      result.type === 'ride' && 'bg-[#FFCC00]/20 text-[#FFCC00]',
                      result.type === 'customer' && 'bg-blue-500/20 text-blue-500',
                      result.type === 'driver' && 'bg-green-500/20 text-green-500'
                    )}
                  >
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate">
                        {result.title}
                      </span>
                      {result.status && (
                        <StatusBadge status={result.status as any} />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="truncate">{result.subtitle}</span>
                      {result.timestamp && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {result.timestamp}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="px-4 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
            {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
