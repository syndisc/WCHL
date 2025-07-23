import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, AlertCircle } from "lucide-react"
import { useLMS } from "@/hooks/useLMS"

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useLMS();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loginError, setLoginError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!formData.email || !formData.password) {
      setLoginError("Please fill in all fields");
      return;
    }

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Store token and user data

        console.log("Login successful:", result.data);
        const user = {
          ...result.data.user,
          last_login: result.data.user.last_login ? result.data.user.last_login.toString() : "",
          created: result.data.user.created.toString(),
          updated: result.data.user.updated.toString(),
          edoo_token: result.data.user.edoo_token.toString(),
        };

        console.log(user)
        localStorage.setItem('authToken', result.data.token);
        localStorage.setItem('userData', JSON.stringify(user));


        // Navigate based on user role
        const userRole = user.role;
        switch (userRole) {
          case 'student':
            navigate("/dashboard");
            break;
          case 'instructor':
            navigate("/instructor/dashboard");
            break;
          case 'admin':
            navigate("/admin/dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      } else {
        setLoginError(result.error || "Login failed");
      }
    } catch (err) {
      setLoginError("An unexpected error occurred");
      console.error("Login error:", err);
    }
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
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              {(loginError || error) && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{loginError || error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <a href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center text-sm">
                {"Don't have an account? "}
                <a href="/auth/register" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
