
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, TrendingDown, Target } from "lucide-react";

interface DashboardProps {
  isMonitoring: boolean;
  sessionTime: number;
}

const Dashboard = ({ isMonitoring, sessionTime }: DashboardProps) => {
  const mockData = {
    todayGoal: 8 * 3600, // 8 hours in seconds
    productiveTime: 6.2 * 3600, // 6.2 hours
    topApps: [
      { name: "Visual Studio Code", time: 2.5 * 3600, category: "productive", percentage: 35 },
      { name: "Chrome - Documentation", time: 1.8 * 3600, category: "productive", percentage: 25 },
      { name: "Slack", time: 1.2 * 3600, category: "neutral", percentage: 17 },
      { name: "Email Client", time: 0.9 * 3600, category: "productive", percentage: 13 },
      { name: "Social Media", time: 0.7 * 3600, category: "non-productive", percentage: 10 }
    ],
    weeklyTrend: [
      { day: "Mon", efficiency: 85 },
      { day: "Tue", efficiency: 78 },
      { day: "Wed", efficiency: 82 },
      { day: "Thu", efficiency: 75 },
      { day: "Fri", efficiency: 88 },
      { day: "Sat", efficiency: 45 },
      { day: "Sun", efficiency: 30 }
    ]
  };

  const formatHours = (seconds: number) => {
    const hours = seconds / 3600;
    return `${hours.toFixed(1)}h`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "productive": return "bg-green-100 text-green-800";
      case "neutral": return "bg-yellow-100 text-yellow-800";
      case "non-productive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "productive": return <TrendingUp className="h-4 w-4" />;
      case "non-productive": return <TrendingDown className="h-4 w-4" />;
      default: return null;
    }
  };

  const todayProgress = (mockData.productiveTime / mockData.todayGoal) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Today's Progress */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Today's Progress
          </CardTitle>
          <CardDescription>Track your daily productivity goal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Productive Time</span>
            <span className="text-sm text-gray-600">{formatHours(mockData.productiveTime)} / {formatHours(mockData.todayGoal)}</span>
          </div>
          <Progress value={todayProgress} className="h-3" />
          <div className="flex justify-between text-sm">
            <span className="text-green-600 font-medium">{todayProgress.toFixed(1)}% complete</span>
            <span className="text-gray-500">{formatHours(mockData.todayGoal - mockData.productiveTime)} remaining</span>
          </div>
        </CardContent>
      </Card>

      {/* Live Session Stats */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            Current Session
          </CardTitle>
          <CardDescription>Real-time monitoring statistics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {Math.floor(sessionTime / 60)}
              </p>
              <p className="text-sm text-blue-800">Minutes Active</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {Math.floor((sessionTime / 60) * 0.8)}
              </p>
              <p className="text-sm text-green-800">Productive Min</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isMonitoring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {isMonitoring ? 'Currently Monitoring' : 'Monitoring Paused'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Applications */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg lg:col-span-2">
        <CardHeader>
          <CardTitle>Top Applications Today</CardTitle>
          <CardDescription>Most used applications and their productivity classification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.topApps.map((app, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{app.name}</p>
                    <p className="text-sm text-gray-600">{formatHours(app.time)} today</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{app.percentage}%</p>
                    <Progress value={app.percentage} className="w-20 h-2" />
                  </div>
                  <Badge className={getCategoryColor(app.category)}>
                    {getCategoryIcon(app.category)}
                    <span className="ml-1 capitalize">{app.category}</span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
