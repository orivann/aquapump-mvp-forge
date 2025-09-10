import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, Save, Eye, MessageSquare, BarChart3, LogOut } from "lucide-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";


const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'chat'>('overview');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [chatSettings, setChatSettings] = useState({
    maxTokens: 500,
    temperature: 0.7,
    model: 'gpt-5-2025-08-07',
    enableMemory: true,
    autoSuggestProducts: true
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const metricsPromise = axios.get('/api/admin/metrics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const aiConfigPromise = axios.get('/api/admin/ai-config', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const [metricsResponse, aiConfigResponse] = await Promise.all([metricsPromise, aiConfigPromise]);

        setMetrics(metricsResponse.data);
        setChatSettings(prev => ({ ...prev, model: aiConfigResponse.data.model }));

      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch admin data.',
          variant: 'destructive',
        });
      }
    };
    fetchData();
  }, [toast]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSaveSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const service = chatSettings.model.includes('gpt') ? 'openai' : 'claude';
      await axios.post('/api/admin/ai-config',
        { service, model: chatSettings.model },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: "Settings Saved",
        description: "Chatbot configuration has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save AI configuration.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-industrial-blue" />
            Admin Panel
          </h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex space-x-1 bg-industrial-blue-light rounded-lg p-1 mb-6">
          <Button
            variant={activeTab === 'overview' ? 'industrial' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('overview')}
            className="flex-1"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === 'chat' ? 'industrial' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('chat')}
            className="flex-1"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat Settings
          </Button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-0 shadow-card">
                  <CardHeader><CardTitle>Used Memory</CardTitle></CardHeader>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-industrial-blue">{metrics ? metrics.used_memory_human : <Skeleton className="h-8 w-24 mx-auto" />}</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-card">
                  <CardHeader><CardTitle>Total Keys</CardTitle></CardHeader>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-industrial-blue">{metrics ? metrics.total_keys : <Skeleton className="h-8 w-16 mx-auto" />}</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-card">
                  <CardHeader><CardTitle>Cache Hit Rate</CardTitle></CardHeader>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-industrial-blue">
                        {metrics ? (
                          (metrics.keyspace_hits + metrics.keyspace_misses > 0) ?
                          `${((metrics.keyspace_hits / (metrics.keyspace_hits + metrics.keyspace_misses)) * 100).toFixed(2)}%`
                          : 'N/A'
                        ) : <Skeleton className="h-8 w-20 mx-auto" />}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Redis Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {metrics ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Redis Version</span>
                        <Badge variant="secondary">{metrics.redis_version}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Connected Clients</span>
                        <span className="text-sm text-industrial-grey">{metrics.connected_clients}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Uptime (days)</span>
                        <span className="text-sm text-industrial-grey">{metrics.uptime_in_days}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="space-y-6">
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">AI Model Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Model Selection</Label>
                      <Select value={chatSettings.model} onValueChange={(value) => setChatSettings(prev => ({ ...prev, model: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-5-2025-08-07">GPT-5 (Recommended)</SelectItem>
                          <SelectItem value="gpt-4.1-2025-04-14">GPT-4.1</SelectItem>
                          <SelectItem value="claude-sonnet-4-20250514">Claude 4 Sonnet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Max Tokens</Label>
                      <Input
                        type="number"
                        value={chatSettings.maxTokens}
                        onChange={(e) => setChatSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Temperature (Creativity): {chatSettings.temperature}</Label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={chatSettings.temperature}
                      onChange={(e) => setChatSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                      className="w-full mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">System Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Customize the AI assistant's behavior and knowledge..."
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    rows={6}
                    className="mb-4"
                  />
                  <Button onClick={handleSaveSettings} variant="industrial">
                    <Save className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
  );
};

export default AdminPanel;