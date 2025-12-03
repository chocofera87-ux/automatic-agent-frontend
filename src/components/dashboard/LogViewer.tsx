import { LogEntry, RideRequest } from '@/types/rides';
import { formatTimestamp } from '@/utils/formatters';
import { StatusBadge, EventBadge } from './StatusBadge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowDownLeft, ArrowUpRight, Terminal, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LogViewerProps {
  ride: RideRequest | null;
  logs: LogEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export function LogViewer({ ride, logs, isOpen, onClose }: LogViewerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-left flex items-center gap-3">
                <span className="font-mono">{ride?.id || 'Logs'}</span>
                {ride && <StatusBadge status={ride.status} />}
              </SheetTitle>
              <SheetDescription className="text-left mt-1">
                {ride ? `Message history and API events` : 'Select a ride to view logs'}
              </SheetDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)]">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-6">
              <Terminal className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                No logs available for this ride
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {logs.map((log, index) => (
                <LogEntryItem
                  key={log.id}
                  log={log}
                  style={{ animationDelay: `${index * 30}ms` }}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface LogEntryItemProps {
  log: LogEntry;
  style?: React.CSSProperties;
}

function LogEntryItem({ log, style }: LogEntryItemProps) {
  const isMessage = log.type === 'message';
  const isError = log.type === 'error' || log.severity === 'error';
  const isIncoming = log.direction === 'incoming';

  return (
    <div
      className={cn(
        'animate-slide-up rounded-lg p-3 border',
        isMessage
          ? isIncoming
            ? 'bg-muted/50 border-border'
            : 'bg-primary/5 border-primary/20'
          : isError
          ? 'bg-destructive/5 border-destructive/20'
          : 'bg-muted/30 border-border'
      )}
      style={style}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
            isMessage
              ? isIncoming
                ? 'bg-muted'
                : 'bg-primary/10'
              : isError
              ? 'bg-destructive/10'
              : 'bg-muted'
          )}
        >
          {isMessage ? (
            isIncoming ? (
              <ArrowDownLeft className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ArrowUpRight className="w-4 h-4 text-primary" />
            )
          ) : isError ? (
            <AlertCircle className="w-4 h-4 text-destructive" />
          ) : (
            <Terminal className="w-4 h-4 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isMessage ? (
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {isIncoming ? 'Incoming' : 'Outgoing'}
              </span>
            ) : (
              <EventBadge type={log.severity || 'info'} />
            )}
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(log.timestamp)}
            </span>
          </div>

          <p
            className={cn(
              'text-sm',
              isMessage ? 'text-foreground' : 'font-mono text-muted-foreground'
            )}
          >
            {log.content}
          </p>
        </div>
      </div>
    </div>
  );
}
