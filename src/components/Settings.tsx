
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, User, Database, Cog } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [appCategories, setAppCategories] = useState([
    { name: "Visual Studio Code", category: "productive" },
    { name: "Chrome - Documentation", category: "productive" },
    { name: "Slack", category: "neutral" },
    { name: "Email Client", category: "productive" },
    { name: "Social Media", category: "non-productive" },
    { name: "YouTube", category: "non-productive" },
    { name: "Figma", category: "productive" },
    { name: "Zoom", category: "neutral" }
  ]);

  const [preferences, setPreferences] = useState({
    monitoring: {
      interval: "1",
      startWithSystem: false,
      minimizeToTray: true,
      trackIdleTime: true,
      idleThreshold: "5"
    },
    goals: {
      dailyGoal: "8",
      weeklyGoal: "40",
      efficiencyTarget: "80"
    },
    privacy: {
      trackWindowTitles: true,
      dataRetention: "90",
      exportEnabled: true
    }
  });

  const handleCategoryChange = (appName: string, newCategory: string) => {
    setAppCategories(prev => 
      prev.map(app => 
        app.name === appName ? { ...app, category: newCategory } : app
      )
    );
    toast.success(`${appName} categorized as ${newCategory}`);
  };

  const handleAddApp = (appName: string, category: string) => {
    if (appName.trim()) {
      setAppCategories(prev => [...prev, { name: appName.trim(), category }]);
      toast.success(`Added ${appName} to ${category} category`);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "productive": return "bg-green-100 text-green-800";
      case "neutral": return "bg-yellow-100 text-yellow-800";
      case "non-productive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
          <TabsTrigger value="categories">App Categories</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Data</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          {/* Add New App */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Add New Application</CardTitle>
              <CardDescription>Categorize a new application for productivity tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input 
                    placeholder="Application name (e.g., Chrome, Photoshop)" 
                    id="new-app-name"
                  />
                </div>
                <Select defaultValue="productive">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="productive">Productive</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="non-productive">Non-Productive</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={() => {
                    const input = document.getElementById('new-app-name') as HTMLInputElement;
                    const select = document.querySelector('[role="combobox"]') as HTMLElement;
                    const category = select?.getAttribute('data-value') || 'productive';
                    handleAddApp(input.value, category);
                    input.value = '';
                  }}
                >
                  Add App
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Categories */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Application Categories</CardTitle>
              <CardDescription>Manage how applications are categorized for productivity scoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appCategories.map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <SettingsIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{app.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getCategoryColor(app.category)}>
                        {app.category}
                      </Badge>
                      <Select
                        value={app.category}
                        onValueChange={(value) => handleCategoryChange(app.name, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="productive">Productive</SelectItem>
                          <SelectItem value="neutral">Neutral</SelectItem>
                          <SelectItem value="non-productive">Non-Productive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="h-5 w-5" />
                Monitoring Settings
              </CardTitle>
              <CardDescription>Configure how the application monitors your activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="interval">Monitoring Interval (seconds)</Label>
                  <Select
                    value={preferences.monitoring.interval}
                    onValueChange={(value) => 
                      setPreferences(prev => ({
                        ...prev,
                        monitoring: { ...prev.monitoring, interval: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 second</SelectItem>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idle-threshold">Idle Threshold (minutes)</Label>
                  <Input
                    id="idle-threshold"
                    type="number"
                    value={preferences.monitoring.idleThreshold}
                    onChange={(e) => 
                      setPreferences(prev => ({
                        ...prev,
                        monitoring: { ...prev.monitoring, idleThreshold: e.target.value }
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="start-with-system">Start with system</Label>
                  <Switch
                    id="start-with-system"
                    checked={preferences.monitoring.startWithSystem}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({
                        ...prev,
                        monitoring: { ...prev.monitoring, startWithSystem: checked }
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="minimize-to-tray">Minimize to system tray</Label>
                  <Switch
                    id="minimize-to-tray"
                    checked={preferences.monitoring.minimizeToTray}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({
                        ...prev,
                        monitoring: { ...prev.monitoring, minimizeToTray: checked }
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="track-idle-time">Track idle time</Label>
                  <Switch
                    id="track-idle-time"
                    checked={preferences.monitoring.trackIdleTime}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({
                        ...prev,
                        monitoring: { ...prev.monitoring, trackIdleTime: checked }
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Goals & Targets
              </CardTitle>
              <CardDescription>Set your productivity goals and targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="daily-goal">Daily Goal (hours)</Label>
                  <Input
                    id="daily-goal"
                    type="number"
                    value={preferences.goals.dailyGoal}
                    onChange={(e) => 
                      setPreferences(prev => ({
                        ...prev,
                        goals: { ...prev.goals, dailyGoal: e.target.value }
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weekly-goal">Weekly Goal (hours)</Label>
                  <Input
                    id="weekly-goal"
                    type="number"
                    value={preferences.goals.weeklyGoal}
                    onChange={(e) => 
                      setPreferences(prev => ({
                        ...prev,
                        goals: { ...prev.goals, weeklyGoal: e.target.value }
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="efficiency-target">Efficiency Target (%)</Label>
                  <Input
                    id="efficiency-target"
                    type="number"
                    min="0"
                    max="100"
                    value={preferences.goals.efficiencyTarget}
                    onChange={(e) => 
                      setPreferences(prev => ({
                        ...prev,
                        goals: { ...prev.goals, efficiencyTarget: e.target.value }
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Privacy & Data Management
              </CardTitle>
              <CardDescription>Control how your data is collected and stored</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="track-window-titles">Track window titles</Label>
                    <p className="text-sm text-gray-600 mt-1">Capture detailed window information for better categorization</p>
                  </div>
                  <Switch
                    id="track-window-titles"
                    checked={preferences.privacy.trackWindowTitles}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, trackWindowTitles: checked }
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="export-enabled">Enable data export</Label>
                    <p className="text-sm text-gray-600 mt-1">Allow exporting data to CSV and JSON formats</p>
                  </div>
                  <Switch
                    id="export-enabled"
                    checked={preferences.privacy.exportEnabled}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, exportEnabled: checked }
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-retention">Data retention (days)</Label>
                <Select
                  value={preferences.privacy.dataRetention}
                  onValueChange={(value) => 
                    setPreferences(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, dataRetention: value }
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">6 months</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <Button variant="destructive" className="mr-4">
                  Clear All Data
                </Button>
                <Button variant="outline">
                  Export Current Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Settings */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Save Configuration</h3>
              <p className="text-sm text-gray-600">Apply all changes to your settings</p>
            </div>
            <Button onClick={handleSaveSettings} size="lg">
              Save All Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
