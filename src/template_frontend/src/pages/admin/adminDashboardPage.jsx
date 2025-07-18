import React, { useState, useEffect } from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "../../components/ui/card"
import { Users, BookOpen, DollarSign, GraduationCap, AlertCircle, TrendingUp, Activity } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts"
import { useLMS } from "../../hooks/useLMS"

const COLORS = ["#2563eb", "#22c55e", "#facc15"]

export default function AdminDashboardPage() {
    const { getAdminDashboard, loading, error } = useLMS();
    const [dashboardData, setDashboardData] = useState(null);
    const [loadingError, setLoadingError] = useState("");

    useEffect(() => {
        const loadDashboardData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setLoadingError("No authentication token found");
                return;
            }

            try {
                const result = await getAdminDashboard(token);
                if (result.success) {
                    setDashboardData(result.data);
                } else {
                    setLoadingError(result.error || "Failed to load dashboard data");
                }
            } catch (err) {
                setLoadingError("An unexpected error occurred");
                console.error("Admin dashboard loading error:", err);
            }
        };

        loadDashboardData();
    }, [getAdminDashboard]);

    // Default data for charts when no backend data is available
    const getChartData = () => {
        if (!dashboardData) {
            return {
                monthlyCourseData: [
                    { month: "Jan", courses: 30 },
                    { month: "Feb", courses: 45 },
                    { month: "Mar", courses: 60 },
                    { month: "Apr", courses: 70 },
                    { month: "May", courses: 65 },
                    { month: "Jun", courses: 90 },
                ],
                enrollmentTrend: [
                    { month: "Jan", students: 700, teachers: 100 },
                    { month: "Feb", students: 930, teachers: 120 },
                    { month: "Mar", students: 1100, teachers: 135 },
                    { month: "Apr", students: 1200, teachers: 148 },
                    { month: "May", students: 1300, teachers: 172 },
                    { month: "Jun", students: 1500, teachers: 204 },
                ],
                userDistribution: [
                    { name: "Students", value: 12315 },
                    { name: "Lecturers", value: 243 },
                    { name: "Admins", value: 5 },
                ]
            };
        }

        // Transform backend data for charts
        return {
            monthlyCourseData: dashboardData.monthly_courses || [],
            enrollmentTrend: dashboardData.enrollment_trend || [],
            userDistribution: [
                { name: "Students", value: dashboardData.total_students || 0 },
                { name: "Instructors", value: dashboardData.total_instructors || 0 },
                { name: "Admins", value: dashboardData.total_admins || 0 },
            ]
        };
    };

    const chartData = getChartData();

    const formatDate = (timestamp) => {
        return new Date(timestamp / 1000000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-64 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Analytics Dashboard</h1>
                <p className="text-gray-600 mt-1">Monitor platform-wide activity and trends</p>
            </div>

            {/* Error Display */}
            {(loadingError || error) && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
                    <AlertCircle className="h-5 w-5" />
                    <span>{loadingError || error}</span>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                        <Users className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.total_students?.toLocaleString() || '12,315'}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {dashboardData?.student_growth || '+5.2%'} this month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Instructors</CardTitle>
                        <GraduationCap className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.total_instructors?.toLocaleString() || '243'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {dashboardData?.new_instructors || '3'} new signups
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Running Courses</CardTitle>
                        <BookOpen className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dashboardData?.total_courses?.toLocaleString() || '528'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {dashboardData?.pending_courses || '12'} under review
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                        <DollarSign className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${dashboardData?.total_revenue?.toLocaleString() || '78,320'}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {dashboardData?.revenue_growth || '+8.1%'} from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Student Enrollment Trend</CardTitle>
                        <CardDescription>Monthly student and instructor signups</CardDescription>
                    </CardHeader>
                    <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData.enrollmentTrend}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="students"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    name="Students Enrolled"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="teachers"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    name="Active Teachers"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>User Role Distribution</CardTitle>
                        <CardDescription>Total user base split</CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData.userDistribution}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {chartData.userDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly New Course Count</CardTitle>
                        <CardDescription>How many courses were created monthly</CardDescription>
                    </CardHeader>
                    <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData.monthlyCourseData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="courses" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Platform Activity</CardTitle>
                        <CardDescription>Latest platform-wide actions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        {dashboardData?.recent_activities?.length > 0 ? (
                            dashboardData.recent_activities.slice(0, 6).map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p>{activity.description}</p>
                                        <p className="text-xs text-gray-500">
                                            {formatDate(activity.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>📢 {dashboardData?.daily_signups || '23'} new students joined in last 24 hours</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>📘 {dashboardData?.pending_courses || '7'} new courses submitted for review</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span>🧑‍🏫 {dashboardData?.inactive_instructors || '3'} instructors became inactive</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span>💰 ${dashboardData?.daily_revenue || '2,450'} revenue generated today</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>🎓 {dashboardData?.certificates_issued || '15'} certificates issued this week</span>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* System Health */}
            {dashboardData?.system_health && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            System Health
                        </CardTitle>
                        <CardDescription>Platform performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {dashboardData.system_health.uptime || '99.9%'}
                                </div>
                                <div className="text-sm text-gray-600">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {dashboardData.system_health.response_time || '120ms'}
                                </div>
                                <div className="text-sm text-gray-600">Avg Response</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {dashboardData.system_health.active_sessions || '1,234'}
                                </div>
                                <div className="text-sm text-gray-600">Active Sessions</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">
                                    {dashboardData.system_health.error_rate || '0.1%'}
                                </div>
                                <div className="text-sm text-gray-600">Error Rate</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
