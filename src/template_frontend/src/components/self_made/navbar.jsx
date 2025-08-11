import { BookOpen } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const GuestNavbar = () => {
    return (
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">Edoo</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/courses-guest" className="text-gray-600 hover:text-blue-600">
                        Courses
                    </Link>
                    <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                        Help
                    </Link>
                    <Link to="/about" className="text-gray-600 hover:text-blue-600">
                        About Us
                    </Link>
                </nav>
                <div className="flex items-center space-x-4">
                    <Link to="/auth/login">
                        <Button variant="ghost" className="bg-white hover:bg-gray-100 text-blue-500">Login</Button>
                    </Link>
                    <Link to="/auth/register">
                        <Button variant="ghost" className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">Get Started</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default GuestNavbar