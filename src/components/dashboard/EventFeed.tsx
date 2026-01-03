import { useState } from 'react';
import { ApiEvent } from '@/types/rides';
import { EventBadge } from './StatusBadge';
import { formatRelativeTime } from '@/utils/formatters';
import { ChevronDown, ChevronRight, Activity, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface EventFeedProps {
  events: ApiEvent[];
  isLoading?: boolean;
}

export function EventFeed({ events, isLoading }: EventFeedProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (isLoading) {
    return <EventFeedSkeleton />;
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        {/* Header with Mi Chame accent */}
        <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors bg-gradient-to-r from-[#FFCC00]/10 to-transparent border-b border-border">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#FFCC00]" />
            <span className="font-semibold text-sm">Eventos do Sistema</span>
            <span className="px-2 py-0.5 bg-[#FFCC00]/20 text-[#FFCC00] text-xs font-medium rounded-full">
              {events.length}
            </span>
          </div>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div>
            {events.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#FFCC00]/10 flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-7 h-7 text-[#FFCC00]" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">Nenhum evento ainda</p>
                <p className="text-xs text-muted-foreground">Os eventos aparecerão aqui em tempo real</p>
              </div>
            ) : (
              <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
                {events.map((event, index) => (
                  <EventItem
                    key={event.id}
                    event={event}
                    style={{ animationDelay: `${index * 30}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

interface EventItemProps {
  event: ApiEvent;
  style?: React.CSSProperties;
}

function EventItem({ event, style }: EventItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMetadata = event.metadata && Object.keys(event.metadata).length > 0;

  return (
    <div
      className={cn(
        'px-4 py-3 animate-fade-in',
        hasMetadata && 'cursor-pointer hover:bg-muted/30'
      )}
      style={style}
      onClick={() => hasMetadata && setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <EventBadge type={event.type} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-medium text-foreground">{event.title}</h4>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatRelativeTime(event.timestamp)}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mt-0.5">{event.description}</p>

          {event.rideId && (
            <span className="inline-block mt-1 text-xs font-mono text-primary/70 bg-primary/5 px-1.5 py-0.5 rounded">
              {event.rideId}
            </span>
          )}

          {isExpanded && hasMetadata && (
            <div className="mt-2 p-2 bg-muted/50 rounded text-xs font-mono space-y-1">
              {Object.entries(event.metadata!).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {hasMetadata && (
          <ChevronRight
            className={cn(
              'w-4 h-4 text-muted-foreground transition-transform flex-shrink-0',
              isExpanded && 'rotate-90'
            )}
          />
        )}
      </div>
    </div>
  );
}

function EventFeedSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Header Skeleton */}
      <div className="px-4 py-3 flex items-center gap-2 bg-gradient-to-r from-[#FFCC00]/10 to-transparent border-b border-border">
        <Skeleton className="w-5 h-5 rounded" />
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-8 h-5 rounded-full" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="px-4 py-3">
            <div className="flex items-start gap-3">
              <Skeleton className="w-14 h-5 rounded-md" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="w-36 h-4" />
                  <Skeleton className="w-16 h-3" />
                </div>
                <Skeleton className="w-full h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
