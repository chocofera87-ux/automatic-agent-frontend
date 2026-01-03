import { RideStatus, EventType } from '@/types/rides';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: RideStatus;
  className?: string;
}

const statusConfig: Record<RideStatus, { label: string; className: string; dotColor: string }> = {
  requested: {
    label: 'Solicitado',
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    dotColor: 'bg-blue-500',
  },
  accepted: {
    label: 'Aceito',
    className: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    dotColor: 'bg-green-500',
  },
  'no-driver': {
    label: 'Sem Motorista',
    className: 'bg-[#FFCC00]/10 text-[#CC9900] dark:text-[#FFCC00] border-[#FFCC00]/20',
    dotColor: 'bg-[#FFCC00]',
  },
  failed: {
    label: 'Falhou',
    className: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    dotColor: 'bg-red-500',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
        config.className,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dotColor)} />
      {config.label}
    </span>
  );
}

interface EventBadgeProps {
  type: EventType;
  className?: string;
}

const eventConfig: Record<EventType, { label: string; className: string; dotColor: string }> = {
  info: {
    label: 'Info',
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    dotColor: 'bg-blue-500',
  },
  success: {
    label: 'Sucesso',
    className: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    dotColor: 'bg-green-500',
  },
  warning: {
    label: 'Aviso',
    className: 'bg-[#FFCC00]/10 text-[#CC9900] dark:text-[#FFCC00] border-[#FFCC00]/20',
    dotColor: 'bg-[#FFCC00]',
  },
  error: {
    label: 'Erro',
    className: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    dotColor: 'bg-red-500',
  },
};

export function EventBadge({ type, className }: EventBadgeProps) {
  const config = eventConfig[type];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border',
        config.className,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dotColor)} />
      {config.label}
    </span>
  );
}
