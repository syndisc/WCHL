import { Outlet, Link, useLocation } from "react-router-dom"
import { Users, LayoutDashboard } from "lucide-react"

export default function AdminLayout() {
  const location = useLocation()

  const nav = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "User Management", path: "/admin/user_management", icon: Users },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="h-16 flex items-center px-6 border-b text-xl font-bold">
          Edoo Admin
        </div>
        <nav className="p-4 space-y-2">
          {nav.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md font-medium ${
                location.pathname === path
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
