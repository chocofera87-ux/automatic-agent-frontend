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
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">System Events</span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
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
          <div className="border-t border-border">
            {events.length === 0 ? (
              <div className="py-8 text-center">
                <Zap className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No events yet</p>
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
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-3 flex items-center gap-2">
        <Skeleton className="w-4 h-4 rounded" />
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-6 h-5 rounded-full" />
      </div>
      <div className="border-t border-border divide-y divide-border">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="px-4 py-3">
            <div className="flex items-start gap-3">
              <Skeleton className="w-12 h-5 rounded" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-20 h-3" />
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
