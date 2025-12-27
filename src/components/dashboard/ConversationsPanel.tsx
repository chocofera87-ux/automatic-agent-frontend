import { useState, useEffect } from 'react';
import { MessageSquare, Phone, User, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getConversations, type ConversationData } from '@/lib/api';

interface ConversationsPanelProps {
  onSelectConversation?: (id: string) => void;
  className?: string;
}

const stateLabels: Record<string, { label: string; color: string }> = {
  GREETING: { label: 'Iniciando', color: 'bg-blue-500' },
  AWAITING_ORIGIN: { label: 'Origem', color: 'bg-yellow-500' },
  AWAITING_DESTINATION: { label: 'Destino', color: 'bg-yellow-500' },
  AWAITING_CATEGORY: { label: 'Categoria', color: 'bg-orange-500' },
  SHOWING_PRICE: { label: 'Preço', color: 'bg-purple-500' },
  AWAITING_CONFIRMATION: { label: 'Confirmação', color: 'bg-purple-500' },
  CREATING_RIDE: { label: 'Criando', color: 'bg-blue-500' },
  RIDE_CREATED: { label: 'Corrida', color: 'bg-green-500' },
  RIDE_IN_PROGRESS: { label: 'Em Andamento', color: 'bg-green-600' },
  RIDE_COMPLETED: { label: 'Finalizada', color: 'bg-gray-500' },
  CANCELLED: { label: 'Cancelada', color: 'bg-red-500' },
  ERROR: { label: 'Erro', color: 'bg-red-600' },
};

export function ConversationsPanel({ onSelectConversation, className }: ConversationsPanelProps) {
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      const response = await getConversations({ active: !showAll, limit: 20 });
      if (response.success && response.data) {
        setConversations(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, [showAll]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'agora';
    if (diffMins < 60) return `${diffMins}min`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h`;
    return date.toLocaleDateString('pt-BR');
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 13 && cleaned.startsWith('55')) {
      return `(${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
    }
    return phone;
  };

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#FFCC00]/10">
              <MessageSquare className="w-4 h-4 text-[#FFCC00]" />
            </div>
            Conversas WhatsApp
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {conversations.filter(c => c.isActive).length} ativas
          </Badge>
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            variant={!showAll ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowAll(false)}
            className="text-xs h-7"
          >
            Ativas
          </Button>
          <Button
            variant={showAll ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowAll(true)}
            className="text-xs h-7"
          >
            Todas
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <MessageSquare className="w-10 h-10 mb-2 opacity-50" />
            <p className="text-sm">Nenhuma conversa {showAll ? '' : 'ativa'}</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="divide-y divide-border">
              {conversations.map((conv) => {
                const stateInfo = stateLabels[conv.state] || { label: conv.state, color: 'bg-gray-500' };
                return (
                  <button
                    key={conv.id}
                    onClick={() => onSelectConversation?.(conv.id)}
                    className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-[#FFCC00] flex items-center justify-center flex-shrink-0">
                        {conv.customer.name ? (
                          <span className="text-[#141414] font-semibold text-sm">
                            {conv.customer.name.charAt(0).toUpperCase()}
                          </span>
                        ) : (
                          <User className="w-5 h-5 text-[#141414]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm truncate">
                            {conv.customer.name || formatPhoneNumber(conv.customer.phoneNumber)}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(conv.lastMessageAt)}
                          </span>
                        </div>

                        {conv.customer.name && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                            <Phone className="w-3 h-3" />
                            {formatPhoneNumber(conv.customer.phoneNumber)}
                          </p>
                        )}

                        {conv.lastMessage && (
                          <p className="text-xs text-muted-foreground truncate mb-1.5">
                            {conv.lastMessage.direction === 'OUTGOING' && (
                              <span className="text-[#FFCC00] mr-1">Mi:</span>
                            )}
                            {conv.lastMessage.content.slice(0, 50)}
                            {conv.lastMessage.content.length > 50 ? '...' : ''}
                          </p>
                        )}

                        <div className="flex items-center gap-2">
                          <span className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium text-white',
                            stateInfo.color
                          )}>
                            {stateInfo.label}
                          </span>
                          {conv.hasActiveRide && (
                            <Badge variant="outline" className="text-[10px] h-5 bg-green-500/10 text-green-600 border-green-500/30">
                              Corrida ativa
                            </Badge>
                          )}
                          {conv.isActive && (
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
