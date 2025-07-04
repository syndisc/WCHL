import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" 
import { Input } from "@/components/ui/input" 
import { Label } from "@/components/ui/label" 
import { BookOpen } from "lucide-react"

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // You can add validation/authentication logic here later
    navigate("/dashboard/courses");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Edoo</span>
          </a>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue learning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            <div className="flex items-center justify-between">
              <a href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Button className="w-full" onClick={handleSignIn}>
              Sign In
            </Button>
            <div className="text-center text-sm">
              {"Don't have an account? "}
              <a href="/auth/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
