import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  MessageSquare,
  Bell,
  Globe,
  Webhook,
  Save,
  TestTube,
  CheckCircle2,
  XCircle,
  Loader2,
  Car,
  Bot,
  Phone,
  Database,
  AlertTriangle,
  Eye,
  EyeOff,
  Key,
  Shield,
  RefreshCw,
  Pencil,
  Trash2,
  X,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  getHealth,
  getCredentials,
  getMissingCredentials,
  saveCredentials,
  testCredentials,
  deleteCredential,
  type HealthStatus,
  type CredentialInfo,
} from '@/lib/api';

// Credential form field definitions
const CREDENTIAL_FIELDS = {
  whatsapp: [
    { key: 'WHATSAPP_ACCESS_TOKEN', label: 'Access Token', placeholder: 'EAAxxxxxxxx...', required: true, sensitive: true },
    { key: 'WHATSAPP_PHONE_NUMBER_ID', label: 'Phone Number ID', placeholder: '123456789012345', required: true, sensitive: false },
    { key: 'WHATSAPP_BUSINESS_ACCOUNT_ID', label: 'Business Account ID', placeholder: '503563854395009', required: false, sensitive: false },
    { key: 'WHATSAPP_VERIFY_TOKEN', label: 'Verify Token', placeholder: 'michame_verify_token_2024', required: false, sensitive: true },
  ],
  machine: [
    { key: 'MACHINE_GLOBAL_API_KEY', label: 'API Key', placeholder: 'mch_api_xxxxxxxx', required: true, sensitive: true },
    { key: 'MACHINE_GLOBAL_USERNAME', label: 'Username/Email', placeholder: 'user@example.com', required: true, sensitive: false },
    { key: 'MACHINE_GLOBAL_PASSWORD', label: 'Password', placeholder: '••••••••', required: true, sensitive: true },
    { key: 'MACHINE_GLOBAL_BASE_URL', label: 'Base URL', placeholder: 'https://api.taximachine.com.br', required: false, sensitive: false },
  ],
  openai: [
    { key: 'OPENAI_API_KEY', label: 'API Key', placeholder: 'sk-xxxxxxxx', required: false, sensitive: true },
  ],
  twilio: [
    { key: 'TWILIO_ACCOUNT_SID', label: 'Account SID', placeholder: 'ACxxxxxxxx', required: false, sensitive: false },
    { key: 'TWILIO_AUTH_TOKEN', label: 'Auth Token', placeholder: '••••••••', required: false, sensitive: true },
    { key: 'TWILIO_PHONE_NUMBER', label: 'Phone Number', placeholder: '+5519999999999', required: false, sensitive: false },
  ],
};

const SERVICE_INFO = {
  whatsapp: {
    name: 'WhatsApp Business API',
    description: 'Conexão com Meta Cloud API para envio/recebimento de mensagens',
    icon: MessageSquare,
    color: 'bg-[#FFCC00]/10 text-[#FFCC00]',
  },
  machine: {
    name: 'Machine Global',
    description: 'API de integração com o sistema de corridas',
    icon: Car,
    color: 'bg-blue-500/10 text-blue-500',
  },
  openai: {
    name: 'OpenAI',
    description: 'GPT-4 para entendimento de linguagem natural e Whisper para transcrição',
    icon: Bot,
    color: 'bg-purple-500/10 text-purple-500',
  },
  twilio: {
    name: 'Twilio',
    description: 'Call Deflection - redirecionar ligações para WhatsApp',
    icon: Phone,
    color: 'bg-red-500/10 text-red-500',
  },
};

const Settings = () => {
  // Credentials state
  const [credentials, setCredentials] = useState<Record<string, CredentialInfo[]>>({});
  const [credentialForms, setCredentialForms] = useState<Record<string, Record<string, string>>>({
    whatsapp: {},
    machine: {},
    openai: {},
    twilio: {},
  });
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [savingService, setSavingService] = useState<string | null>(null);
  const [testingService, setTestingService] = useState<string | null>(null);

  // Editing state - tracks which credential keys are being edited
  const [editingKeys, setEditingKeys] = useState<Record<string, boolean>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  // Alert state
  const [missingCredentials, setMissingCredentials] = useState<string[]>([]);
  const [showMissingAlert, setShowMissingAlert] = useState(true);

  // Health status
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [isLoadingHealth, setIsLoadingHealth] = useState(true);

  // Refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    autoReply: true,
    notifyNewRides: true,
    notifyFailures: true,
    notifyNoDriver: true,
  });

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchCredentials();
    fetchHealth();
    checkMissingCredentials();
    setTimeout(() => setIsRefreshing(false), 1000);
  }, []);

  useEffect(() => {
    fetchCredentials();
    fetchHealth();
    checkMissingCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const response = await getCredentials();
      if (response.success && response.data) {
        setCredentials(response.data.grouped);
      } else if (response.error) {
        console.error('Failed to fetch credentials:', response.error);
        // Don't show toast here to avoid spamming on page load
      }
    } catch (error) {
      console.error('Failed to fetch credentials:', error);
    }
  };

  const fetchHealth = async () => {
    setIsLoadingHealth(true);
    try {
      const response = await getHealth();
      if (response.success && response.data) {
        setHealthStatus(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch health:', error);
    } finally {
      setIsLoadingHealth(false);
    }
  };

  const checkMissingCredentials = async () => {
    try {
      const response = await getMissingCredentials();
      if (response.success && response.data) {
        setMissingCredentials(response.data.missing);
      }
    } catch (error) {
      console.error('Failed to check missing credentials:', error);
    }
  };

  const handleSaveCredentials = async (service: string) => {
    const formData = credentialForms[service];
    if (!formData || Object.keys(formData).length === 0) {
      toast.error('Nenhuma credencial para salvar');
      return;
    }

    // Filter out empty values
    const nonEmptyCredentials: Record<string, string> = {};
    for (const [key, value] of Object.entries(formData)) {
      if (value && value.trim()) {
        nonEmptyCredentials[key] = value.trim();
      }
    }

    if (Object.keys(nonEmptyCredentials).length === 0) {
      toast.error('Preencha pelo menos uma credencial');
      return;
    }

    setSavingService(service);
    try {
      const response = await saveCredentials(service, nonEmptyCredentials);
      if (response.success) {
        const savedCount = response.data?.savedKeys?.length ?? Object.keys(nonEmptyCredentials).length;
        // Clear form first before showing toast
        setCredentialForms(prev => ({ ...prev, [service]: {} }));

        // Use setTimeout to avoid React DOM conflicts
        setTimeout(() => {
          toast.success(`${savedCount} credenciais salvas com sucesso!`);
        }, 100);

        // Refresh data after a small delay
        setTimeout(() => {
          fetchCredentials();
          checkMissingCredentials();
        }, 200);
      } else {
        toast.error('Erro ao salvar: ' + (response.error || 'Erro desconhecido'));
      }
    } catch (error: any) {
      toast.error('Erro ao salvar credenciais: ' + (error.message || 'Erro desconhecido'));
    } finally {
      setSavingService(null);
    }
  };

  const handleTestCredentials = async (service: string) => {
    setTestingService(service);
    try {
      const response = await testCredentials(service);
      if (response.success && response.data?.success) {
        const message = response.data.message || 'Conexão bem sucedida!';
        setTimeout(() => {
          toast.success(message);
        }, 100);
        setTimeout(() => {
          fetchCredentials();
          fetchHealth();
        }, 200);
      } else {
        const errorMsg = response.data?.error || response.error || 'Verifique as credenciais';
        toast.error('Falha na conexão: ' + errorMsg);
      }
    } catch (error: any) {
      toast.error('Erro ao testar: ' + (error.message || 'Erro desconhecido'));
    } finally {
      setTestingService(null);
    }
  };

  const updateCredentialForm = (service: string, key: string, value: string) => {
    setCredentialForms(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        [key]: value,
      },
    }));
  };

  const togglePasswordVisibility = (key: string) => {
    setShowPasswords(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Start editing a credential
  const startEditing = (key: string) => {
    setEditingKeys(prev => ({ ...prev, [key]: true }));
  };

  // Cancel editing a credential
  const cancelEditing = (service: string, key: string) => {
    setEditingKeys(prev => ({ ...prev, [key]: false }));
    setCredentialForms(prev => ({
      ...prev,
      [service]: { ...prev[service], [key]: '' },
    }));
  };

  // Save a single credential
  const handleSaveSingleCredential = async (service: string, key: string) => {
    const value = credentialForms[service]?.[key];
    if (!value || !value.trim()) {
      toast.error('Digite um valor para salvar');
      return;
    }

    setSavingKey(key);
    try {
      const response = await saveCredentials(service, { [key]: value.trim() });
      setSavingKey(null);

      if (response.success) {
        // Update state first
        setEditingKeys(prev => ({ ...prev, [key]: false }));
        setCredentialForms(prev => ({
          ...prev,
          [service]: { ...prev[service], [key]: '' },
        }));

        // Then fetch and show toast
        await fetchCredentials();
        await checkMissingCredentials();
        toast.success('Credencial salva!');
      } else {
        toast.error(response.error || 'Erro ao salvar');
      }
    } catch (error: any) {
      setSavingKey(null);
      toast.error(error.message || 'Erro ao salvar');
    }
  };

  // Delete a credential
  const handleDeleteCredential = async (key: string) => {
    setDeletingKey(key);
    try {
      const response = await deleteCredential(key);
      setDeletingKey(null);

      if (response.success) {
        await fetchCredentials();
        await checkMissingCredentials();
        toast.success('Credencial excluída!');
      } else {
        toast.error(response.error || 'Erro ao excluir');
      }
    } catch (error: any) {
      setDeletingKey(null);
      toast.error(error.message || 'Erro ao excluir');
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'connected' || status === 'configured') {
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/30">Conectado</Badge>;
    }
    return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/30">Desconectado</Badge>;
  };

  const getCredentialStatus = (creds: CredentialInfo[] | undefined) => {
    if (!creds || creds.length === 0) return { configured: 0, valid: 0, total: 0 };
    const configured = creds.filter(c => c.isConfigured).length;
    const valid = creds.filter(c => c.isValid).length;
    return { configured, valid, total: creds.length };
  };

  const renderCredentialForm = (service: string) => {
    const fields = CREDENTIAL_FIELDS[service as keyof typeof CREDENTIAL_FIELDS] || [];
    const existingCreds = credentials[service] || [];

    return (
      <div className="space-y-4">
        {fields.map((field) => {
          const existing = existingCreds.find(c => c.key === field.key);
          const isConfigured = existing?.isConfigured === true;
          const isValid = existing?.isValid === true;
          const isEditing = editingKeys[field.key] === true;
          const isSaving = savingKey === field.key;
          const isDeleting = deletingKey === field.key;
          const showInput = !isConfigured || isEditing;

          return (
            <div key={field.key} className="p-3 rounded-lg border bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  {field.label}
                  {field.required ? <span className="text-red-500">*</span> : null}
                </Label>
                <Badge
                  variant="outline"
                  className={
                    isConfigured
                      ? (isValid ? 'bg-green-500/10 text-green-600 border-green-500/30' : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30')
                      : 'bg-red-500/10 text-red-500 border-red-500/30'
                  }
                >
                  {isConfigured ? (isValid ? '✓ Verificado' : '• Configurado') : 'Não configurado'}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                {showInput ? (
                  <div className="relative flex-1">
                    <Input
                      id={field.key}
                      type={field.sensitive && !showPasswords[field.key] ? 'password' : 'text'}
                      placeholder={field.placeholder}
                      value={credentialForms[service]?.[field.key] || ''}
                      onChange={(e) => updateCredentialForm(service, field.key, e.target.value)}
                      className="font-mono text-sm pr-10"
                    />
                    {field.sensitive ? (
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(field.key)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPasswords[field.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex-1 px-3 py-2 bg-background rounded border font-mono text-sm text-muted-foreground">
                    {existing?.maskedValue || '••••••••'}
                  </div>
                )}

                {showInput ? (
                  <Button
                    size="sm"
                    onClick={() => handleSaveSingleCredential(service, field.key)}
                    disabled={isSaving || !credentialForms[service]?.[field.key]?.trim()}
                    className="gap-1"
                  >
                    {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                    Salvar
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEditing(field.key)}
                    className="gap-1"
                  >
                    <Pencil className="w-3 h-3" />
                    Editar
                  </Button>
                )}

                {isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => cancelEditing(service, field.key)}
                    className="gap-1"
                  >
                    <X className="w-3 h-3" />
                    Cancelar
                  </Button>
                ) : null}

                {isConfigured && !isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCredential(field.key)}
                    disabled={isDeleting}
                    className="gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                    Excluir
                  </Button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRefresh={handleRefresh} isLoading={isRefreshing} />

      <main className="container mx-auto px-4 sm:px-6 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Configurações
            </h1>
            <p className="text-muted-foreground mt-1">
              Configure as credenciais e preferências do sistema Mi Chame.
            </p>
          </div>

          {/* Missing Credentials Alert */}
          {missingCredentials.length > 0 && showMissingAlert && (
            <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Credenciais Obrigatórias Faltando</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  O sistema precisa das seguintes credenciais para funcionar:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {missingCredentials.map(key => (
                    <li key={key}>{key}</li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setShowMissingAlert(false)}
                >
                  Entendi
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Integration Status */}
          <section className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold">Status das Integrações</h2>
                <p className="text-xs text-muted-foreground">Verificação em tempo real dos serviços</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => { fetchHealth(); fetchCredentials(); }} disabled={isLoadingHealth}>
                {isLoadingHealth ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              </Button>
            </div>

            {isLoadingHealth ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : healthStatus ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(SERVICE_INFO).map(([key, info]) => {
                  const Icon = info.icon;
                  const status = healthStatus.services[key as keyof typeof healthStatus.services]?.status || 'disconnected';
                  const credStatus = getCredentialStatus(credentials[key]);

                  return (
                    <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${info.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-sm font-medium">{info.name}</span>
                          <p className="text-xs text-muted-foreground">
                            {credStatus.configured}/{credStatus.total} configuradas
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(status)}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Não foi possível verificar o status. Verifique se o backend está rodando.
              </p>
            )}
          </section>

          {/* Credentials Configuration */}
          <section className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Key className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h2 className="font-semibold">Configuração de Credenciais</h2>
                <p className="text-xs text-muted-foreground">
                  Configure suas credenciais de forma segura. Os dados são criptografados.
                </p>
              </div>
            </div>

            <Alert className="mb-4 bg-blue-500/10 border-blue-500/30">
              <Shield className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-sm">
                Suas credenciais são armazenadas de forma criptografada e nunca são expostas.
                Após salvar, você verá apenas os valores mascarados.
              </AlertDescription>
            </Alert>

            <Accordion type="single" collapsible className="w-full">
              {Object.entries(SERVICE_INFO).map(([serviceKey, info]) => {
                const Icon = info.icon;
                const credStatus = getCredentialStatus(credentials[serviceKey]);
                const isAllConfigured = credStatus.configured === credStatus.total && credStatus.total > 0;

                return (
                  <AccordionItem key={serviceKey} value={serviceKey}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${info.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <span className="font-medium">{info.name}</span>
                          <p className="text-xs text-muted-foreground font-normal">{info.description}</p>
                        </div>
                        {isAllConfigured ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto mr-2" />
                        ) : credStatus.configured > 0 ? (
                          <AlertTriangle className="w-4 h-4 text-yellow-500 ml-auto mr-2" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500 ml-auto mr-2" />
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4 space-y-4">
                        {renderCredentialForm(serviceKey)}

                        {/* Test Connection Button - only show if at least one credential is configured */}
                        {credStatus.configured > 0 && (
                          <>
                            <Separator />
                            <div className="flex justify-end">
                              <Button
                                variant="outline"
                                onClick={() => handleTestCredentials(serviceKey)}
                                disabled={testingService === serviceKey}
                                className="gap-2"
                              >
                                {testingService === serviceKey ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <TestTube className="w-4 h-4" />
                                )}
                                Testar Conexão
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </section>

          {/* Notifications */}
          <section className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Notificações</h2>
                <p className="text-xs text-muted-foreground">Preferências de alertas</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Novas Corridas</Label>
                  <p className="text-xs text-muted-foreground">Alertar sobre novas solicitações</p>
                </div>
                <Switch
                  checked={settings.notifyNewRides}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifyNewRides: checked })}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Falhas e Erros</Label>
                  <p className="text-xs text-muted-foreground">Alertar sobre falhas no sistema</p>
                </div>
                <Switch
                  checked={settings.notifyFailures}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifyFailures: checked })}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Sem Motorista</Label>
                  <p className="text-xs text-muted-foreground">Quando não há motorista disponível</p>
                </div>
                <Switch
                  checked={settings.notifyNoDriver}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifyNoDriver: checked })}
                />
              </div>
            </div>
          </section>

          {/* Auto Reply */}
          <section className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Webhook className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h2 className="font-semibold">Resposta Automática</h2>
                  <p className="text-xs text-muted-foreground">
                    Responder automaticamente às mensagens via IA
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.autoReply}
                onCheckedChange={(checked) => setSettings({ ...settings, autoReply: checked })}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Settings;
