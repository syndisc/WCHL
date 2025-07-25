import { useEffect, useRef, useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  LayoutDashboard, Users, Bell, Menu, X, Search
} from "lucide-react"

const navigation = [
  // { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "User Management", href: "/admin/user_management", icon: Users },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef(null)
  const [showAvatarMenu, setShowAvatarMenu] = useState(false)
  const avatarRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen max-w-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              {/* <LayoutDashboard className="h-6 w-6 text-blue-600" /> */}
              <img src="/clr.png" alt="Edoo Logo" className="h-10 w-10" />
              <span className="text-lg font-bold">Edoo Admin</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium ${location.pathname === item.href
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r">
          <div className="flex h-16 items-center px-4 border-b">
            <Link to="/admin" className="flex items-center space-x-2">
              {/* <LayoutDashboard className="h-6 w-6 text-blue-600" /> */}
              <img src="/clr.png" alt="Edoo Logo" className="h-10 w-10" />
              <span className="text-lg font-bold">Edoo Admin</span>
            </Link>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium ${location.pathname === item.href
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white border-b">
          <div className="flex h-16 items-center justify-between px-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users or reports..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notification Button */}
              <div className="relative" ref={notificationRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative bg-white"
                >
                  <Bell className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500" />
                </Button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b font-semibold text-gray-700">Notifications</div>
                    <ul className="divide-y text-sm">
                      <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">👤 New user registered</li>
                      <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">⚠️ Suspicious activity detected</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="relative" ref={avatarRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 bg-transparent focus:outline-none hover:border-transparent hover:bg-transparent"
                  onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                >
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>

                {showAvatarMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {/* <div className="px-4 py-3 text-sm text-gray-700">Signed in as <br /><span className="font-medium">student@gmail.com</span></div> */}
                    <div className="border-t" />
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-red-600 bg-white hover:bg-gray-100"
                      onClick={() => {
                        // clear session, redirect to login
                        localStorage.clear()
                        navigate("/auth/login")
                      }}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
