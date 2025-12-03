import { RideStatus, EventType } from '@/types/rides';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: RideStatus;
  className?: string;
}

const statusConfig: Record<RideStatus, { label: string; className: string }> = {
  requested: {
    label: 'Requested',
    className: 'bg-status-requested/10 text-status-requested border-status-requested/20',
  },
  accepted: {
    label: 'Accepted',
    className: 'bg-status-accepted/10 text-status-accepted border-status-accepted/20',
  },
  'no-driver': {
    label: 'No Driver',
    className: 'bg-status-no-driver/10 text-status-no-driver border-status-no-driver/20',
  },
  failed: {
    label: 'Failed',
    className: 'bg-status-failed/10 text-status-failed border-status-failed/20',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

interface EventBadgeProps {
  type: EventType;
  className?: string;
}

const eventConfig: Record<EventType, { className: string }> = {
  info: {
    className: 'bg-event-info/10 text-event-info border-event-info/20',
  },
  success: {
    className: 'bg-event-success/10 text-event-success border-event-success/20',
  },
  warning: {
    className: 'bg-event-warning/10 text-event-warning border-event-warning/20',
  },
  error: {
    className: 'bg-event-error/10 text-event-error border-event-error/20',
  },
};

export function EventBadge({ type, className }: EventBadgeProps) {
  const config = eventConfig[type];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border uppercase tracking-wide',
        config.className,
        className
      )}
    >
      {type}
    </span>
  );
}
