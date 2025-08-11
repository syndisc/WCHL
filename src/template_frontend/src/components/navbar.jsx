import * as React from "react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar = React.forwardRef(({ className, activePath = "", ...props }, ref) => {
  const navLinks = [
    { to: "/", label: "Home", exact: true },
    { to: "/courses-guest", label: "Courses" },
    { to: "/about", label: "About" },
    // { to: "/help/:slug", label: "Help" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header ref={ref} className={cn(className)} {...props}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">Edoo</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = link.exact
              ? activePath === link.to
              : activePath.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "transition-colors",
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-600 hover:text-blue-600"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/auth/login">
            <Button
              variant="ghost"
              className="bg-white/0 text-blue-500 border-none hover:text-blue-500 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-0"
            >
              Login
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button className="bg-blue-600 hover:bg-blue-700 active:hover:bg-blue-800 focus:outline-none focus:ring-0">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";

export { Navbar };