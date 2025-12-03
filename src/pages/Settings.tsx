import { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MessageSquare,
  Bell,
  Globe,
  Shield,
  Webhook,
  Save,
  TestTube,
} from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const [settings, setSettings] = useState({
    webhookUrl: 'https://api.example.com/whatsapp/webhook',
    verifyToken: '••••••••••••',
    phoneNumberId: '123456789012345',
    autoReply: true,
    notifyNewRides: true,
    notifyFailures: true,
    notifyNoDriver: true,
    defaultCurrency: 'USD',
    timezone: 'America/New_York',
    maxSearchRadius: '10',
    pricePerKm: '1.50',
  });

  const handleSave = () => {
    toast.success('Settings saved', {
      description: 'Your configuration has been updated.',
    });
  };

  const handleTestWebhook = () => {
    toast.info('Testing webhook...', {
      description: 'Sending test request to your endpoint.',
    });
    setTimeout(() => {
      toast.success('Webhook test passed', {
        description: 'Your endpoint responded successfully.',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 py-6 max-w-3xl">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your WhatsApp integration and system preferences.
            </p>
          </div>

          {/* WhatsApp API Configuration */}
          <section className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-status-accepted/10">
                <MessageSquare className="w-5 h-5 text-status-accepted" />
              </div>
              <div>
                <h2 className="font-semibold">WhatsApp Business API</h2>
                <p className="text-xs text-muted-foreground">Meta Cloud API configuration</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumberId">Phone Number ID</Label>
                <Input
                  id="phoneNumberId"
                  value={settings.phoneNumberId}
                  onChange={(e) => setSettings({ ...settings, phoneNumberId: e.target.value })}
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  value={settings.webhookUrl}
                  onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="verifyToken">Verify Token</Label>
                <Input
                  id="verifyToken"
                  type="password"
                  value={settings.verifyToken}
                  onChange={(e) => setSettings({ ...settings, verifyToken: e.target.value })}
                  className="font-mono"
                />
              </div>

              <Button variant="outline" size="sm" onClick={handleTestWebhook} className="gap-2">
                <TestTube className="w-4 h-4" />
                Test Webhook
              </Button>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Notifications</h2>
                <p className="text-xs text-muted-foreground">Alert preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>New Ride Requests</Label>
                  <p className="text-xs text-muted-foreground">Get notified of incoming rides</p>
                </div>
                <Switch
                  checked={settings.notifyNewRides}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifyNewRides: checked })}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Failures & Errors</Label>
                  <p className="text-xs text-muted-foreground">Alert on payment or system failures</p>
                </div>
                <Switch
                  checked={settings.notifyFailures}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifyFailures: checked })}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>No Driver Available</Label>
                  <p className="text-xs text-muted-foreground">When rides can't find a driver</p>
                </div>
                <Switch
                  checked={settings.notifyNoDriver}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifyNoDriver: checked })}
                />
              </div>
            </div>
          </section>

          {/* System Preferences */}
          <section className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-muted">
                <Globe className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h2 className="font-semibold">System Preferences</h2>
                <p className="text-xs text-muted-foreground">Regional and pricing settings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select
                  value={settings.defaultCurrency}
                  onValueChange={(value) => setSettings({ ...settings, defaultCurrency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="MXN">MXN ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    <SelectItem value="America/Mexico_City">Mexico City</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxRadius">Max Search Radius (km)</Label>
                <Input
                  id="maxRadius"
                  type="number"
                  value={settings.maxSearchRadius}
                  onChange={(e) => setSettings({ ...settings, maxSearchRadius: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerKm">Price per km</Label>
                <Input
                  id="pricePerKm"
                  type="number"
                  step="0.01"
                  value={settings.pricePerKm}
                  onChange={(e) => setSettings({ ...settings, pricePerKm: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* Auto Reply */}
          <section className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-status-no-driver/10">
                  <Webhook className="w-5 h-5 text-status-no-driver" />
                </div>
                <div>
                  <h2 className="font-semibold">Auto Reply</h2>
                  <p className="text-xs text-muted-foreground">
                    Automatically respond to customer messages
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.autoReply}
                onCheckedChange={(checked) => setSettings({ ...settings, autoReply: checked })}
              />
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
