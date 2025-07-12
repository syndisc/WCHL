import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "../../components/ui/card"
import { Users, BookOpen, DollarSign, GraduationCap } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts"

const monthlyCourseData = [
    { month: "Jan", courses: 30 },
    { month: "Feb", courses: 45 },
    { month: "Mar", courses: 60 },
    { month: "Apr", courses: 70 },
    { month: "May", courses: 65 },
    { month: "Jun", courses: 90 },
]

const enrollmentTrend = [
    { month: "Jan", students: 700, teachers: 100 },
    { month: "Feb", students: 930, teachers: 120 },
    { month: "Mar", students: 1100, teachers: 135 },
    { month: "Apr", students: 1200, teachers: 148 },
    { month: "May", students: 1300, teachers: 172 },
    { month: "Jun", students: 1500, teachers: 204 },
]


const userDistribution = [
    { name: "Students", value: 12315 },
    { name: "Lecturers", value: 243 },
    { name: "Admins", value: 5 },
]

const COLORS = ["#2563eb", "#22c55e", "#facc15"]

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Analytics Dashboard</h1>
                <p className="text-gray-600 mt-1">Monitor platform-wide activity and trends</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                        <Users className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,315</div>
                        <p className="text-xs text-muted-foreground">+5.2% this month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium">Active Lecturers</CardTitle>
                        <GraduationCap className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">243</div>
                        <p className="text-xs text-muted-foreground">+3 new signups</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium">Running Courses</CardTitle>
                        <BookOpen className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">528</div>
                        <p className="text-xs text-muted-foreground">12 under review</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                        <DollarSign className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$78,320</div>
                        <p className="text-xs text-muted-foreground">+8.1% from last month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Student Enrollment Trend</CardTitle>
                        <CardDescription>Monthly student signups</CardDescription>
                    </CardHeader>
                    <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={enrollmentTrend}>
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
                                    data={userDistribution}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {userDistribution.map((entry, index) => (
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
                            <BarChart data={monthlyCourseData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="courses" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Optional: Add table or more widgets here */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Events</CardTitle>
                        <CardDescription>Latest platform-wide actions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div>📢 23 new students joined in last 24 hours</div>
                        <div>📘 7 new courses submitted for review</div>
                        <div>🧑‍🏫 3 instructors became inactive</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
