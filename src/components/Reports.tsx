
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Download, FileText, Settings } from "lucide-react";
import { toast } from "sonner";

const Reports = () => {
  const [emailSettings, setEmailSettings] = useState({
    enabled: true,
    recipients: ["manager@company.com"],
    frequency: "daily",
    time: "09:00"
  });

  const [reportSettings, setReportSettings] = useState({
    includeCharts: true,
    includeRawData: false,
    dateRange: "7days"
  });

  const handleSendReport = () => {
    toast.success("Report sent successfully!");
  };

  const handleExportData = (format: string) => {
    toast.success(`Data exported as ${format.toUpperCase()}`);
  };

  const recentReports = [
    { id: 1, type: "Daily Report", date: "2024-06-28", status: "sent", recipients: 2 },
    { id: 2, type: "Weekly Summary", date: "2024-06-24", status: "sent", recipients: 3 },
    { id: 3, type: "Monthly Analysis", date: "2024-06-01", status: "draft", recipients: 1 },
    { id: 4, type: "Custom Report", date: "2024-06-26", status: "sent", recipients: 1 }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Mail className="h-8 w-8 text-blue-600 mx-auto" />
              <div>
                <h3 className="font-semibold">Send Report Now</h3>
                <p className="text-sm text-gray-600">Generate and send current report</p>
              </div>
              <Button onClick={handleSendReport} className="w-full">
                Send Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Download className="h-8 w-8 text-green-600 mx-auto" />
              <div>
                <h3 className="font-semibold">Export Data</h3>
                <p className="text-sm text-gray-600">Download productivity data</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExportData('csv')}
                  className="flex-1"
                >
                  CSV
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExportData('json')}
                  className="flex-1"
                >
                  JSON
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto" />
              <div>
                <h3 className="font-semibold">Schedule Report</h3>
                <p className="text-sm text-gray-600">Set up automated reporting</p>
              </div>
              <Button variant="outline" className="w-full">
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Configuration */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Email Settings
            </CardTitle>
            <CardDescription>Configure automated email reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-enabled">Enable Email Reports</Label>
              <Switch
                id="email-enabled"
                checked={emailSettings.enabled}
                onCheckedChange={(checked) => 
                  setEmailSettings(prev => ({ ...prev, enabled: checked }))
                }
              />
            </div>

            {emailSettings.enabled && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Textarea
                    id="recipients"
                    placeholder="Enter email addresses (one per line)"
                    value={emailSettings.recipients.join('\n')}
                    onChange={(e) => 
                      setEmailSettings(prev => ({ 
                        ...prev, 
                        recipients: e.target.value.split('\n').filter(email => email.trim()) 
                      }))
                    }
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select
                      value={emailSettings.frequency}
                      onValueChange={(value) => 
                        setEmailSettings(prev => ({ ...prev, frequency: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Send Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={emailSettings.time}
                      onChange={(e) => 
                        setEmailSettings(prev => ({ ...prev, time: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Report Configuration */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Report Settings
            </CardTitle>
            <CardDescription>Customize report content and format</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="include-charts">Include Charts</Label>
              <Switch
                id="include-charts"
                checked={reportSettings.includeCharts}
                onCheckedChange={(checked) => 
                  setReportSettings(prev => ({ ...prev, includeCharts: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="include-raw-data">Include Raw Data</Label>
              <Switch
                id="include-raw-data"
                checked={reportSettings.includeRawData}
                onCheckedChange={(checked) => 
                  setReportSettings(prev => ({ ...prev, includeRawData: checked }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-range">Default Date Range</Label>
              <Select
                value={reportSettings.dateRange}
                onValueChange={(value) => 
                  setReportSettings(prev => ({ ...prev, dateRange: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1day">Last 1 Day</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" variant="outline">
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>History of generated and sent reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{report.type}</p>
                    <p className="text-sm text-gray-600">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={report.status === 'sent' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {report.recipients} recipient{report.recipients > 1 ? 's' : ''}
                  </span>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
