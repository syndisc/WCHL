import React, { useState, useMemo } from 'react'
import { motion } from "framer-motion"
import { 
  BookOpen, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  Play,
  ChevronLeft,
  ChevronRight,
  Coins,
  Award,
  TrendingUp,
  Code,
  Palette,
  BarChart3,
  Camera,
  Brain,
  Globe
} from "lucide-react"
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

// Dummy course data
const allCourses = [
  {
    id: 1,
    title: "Complete Web3 Development Bootcamp",
    instructor: "Alex Chen",
    category: "Blockchain",
    level: "Beginner",
    duration: "12 weeks",
    students: 2543,
    rating: 4.9,
    price: 0.5,
    tokenReward: 150,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    description: "Master blockchain development with hands-on projects and real-world applications."
  },
  {
    id: 2,
    title: "Smart Contract Security Fundamentals",
    instructor: "Sarah Johnson",
    category: "Blockchain",
    level: "Intermediate",
    duration: "8 weeks",
    students: 1876,
    rating: 4.8,
    price: 0.3,
    tokenReward: 120,
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop",
    description: "Learn to identify and prevent common smart contract vulnerabilities."
  },
  {
    id: 3,
    title: "DeFi Protocol Development",
    instructor: "Michael Rodriguez",
    category: "Blockchain",
    level: "Advanced",
    duration: "10 weeks",
    students: 987,
    rating: 4.9,
    price: 0.8,
    tokenReward: 200,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop",
    description: "Build decentralized finance protocols from scratch using Solidity."
  },
  {
    id: 4,
    title: "UI/UX Design for Web3 Apps",
    instructor: "Emma Wilson",
    category: "Design",
    level: "Intermediate",
    duration: "6 weeks",
    students: 3421,
    rating: 4.7,
    price: 0.25,
    tokenReward: 100,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop",
    description: "Design intuitive interfaces for decentralized applications."
  },
  {
    id: 5,
    title: "React Development Mastery",
    instructor: "David Kim",
    category: "Programming",
    level: "Intermediate",
    duration: "10 weeks",
    students: 4567,
    rating: 4.8,
    price: 0.4,
    tokenReward: 130,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    description: "Build modern web applications with React and advanced patterns."
  },
  {
    id: 6,
    title: "Digital Marketing in Web3",
    instructor: "Lisa Zhang",
    category: "Marketing",
    level: "Beginner",
    duration: "4 weeks",
    students: 2109,
    rating: 4.6,
    price: 0.2,
    tokenReward: 80,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    description: "Master marketing strategies for blockchain and crypto projects."
  },
  {
    id: 7,
    title: "NFT Art Creation & Minting",
    instructor: "Carlos Martinez",
    category: "Design",
    level: "Beginner",
    duration: "5 weeks",
    students: 1654,
    rating: 4.5,
    price: 0.15,
    tokenReward: 90,
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=250&fit=crop",
    description: "Create, mint, and sell your own NFT artwork on various marketplaces."
  },
  {
    id: 8,
    title: "Cryptocurrency Trading Strategies",
    instructor: "Jennifer Lee",
    category: "Finance",
    level: "Intermediate",
    duration: "7 weeks",
    students: 3876,
    rating: 4.7,
    price: 0.35,
    tokenReward: 110,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    description: "Learn proven strategies for successful cryptocurrency trading."
  },
  {
    id: 9,
    title: "Python for Data Science",
    instructor: "Robert Brown",
    category: "Programming",
    level: "Beginner",
    duration: "9 weeks",
    students: 5432,
    rating: 4.8,
    price: 0.3,
    tokenReward: 120,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
    description: "Master Python programming for data analysis and machine learning."
  },
  {
    id: 10,
    title: "Blockchain Business Applications",
    instructor: "Anna Taylor",
    category: "Business",
    level: "Intermediate",
    duration: "6 weeks",
    students: 1987,
    rating: 4.6,
    price: 0.25,
    tokenReward: 95,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    description: "Understand how blockchain technology transforms business processes."
  },
  {
    id: 11,
    title: "Advanced Solidity Programming",
    instructor: "Kevin Wong",
    category: "Blockchain",
    level: "Advanced",
    duration: "11 weeks",
    students: 876,
    rating: 4.9,
    price: 0.6,
    tokenReward: 180,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    description: "Advanced Solidity concepts for professional smart contract development."
  },
  {
    id: 12,
    title: "Web3 Photography & Visual Arts",
    instructor: "Maya Patel",
    category: "Design",
    level: "Beginner",
    duration: "4 weeks",
    students: 1234,
    rating: 4.4,
    price: 0.18,
    tokenReward: 75,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=250&fit=crop",
    description: "Capture and monetize your photography in the Web3 ecosystem."
  }
]

const categories = ["All", "Blockchain", "Programming", "Design", "Marketing", "Finance", "Business"]
const levels = ["All", "Beginner", "Intermediate", "Advanced"]
const sortOptions = ["Newest", "Popular", "Rating", "Price: Low to High", "Price: High to Low"]

const categoryIcons = {
  "Blockchain": Code,
  "Programming": Brain,
  "Design": Palette,
  "Marketing": TrendingUp,
  "Finance": BarChart3,
  "Business": Globe
}

export default function ExploreCourses() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [sortBy, setSortBy] = useState("Newest")
  const [showFilters, setShowFilters] = useState(false)
  
  const coursesPerPage = 4

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = allCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel
      
      return matchesSearch && matchesCategory && matchesLevel
    })

    // Sort courses
    switch (sortBy) {
      case "Popular":
        return filtered.sort((a, b) => b.students - a.students)
      case "Rating":
        return filtered.sort((a, b) => b.rating - a.rating)
      case "Price: Low to High":
        return filtered.sort((a, b) => a.price - b.price)
      case "Price: High to Low":
        return filtered.sort((a, b) => b.price - a.price)
      default:
        return filtered
    }
  }, [searchTerm, selectedCategory, selectedLevel, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage)
  const startIndex = (currentPage - 1) * coursesPerPage
  const currentCourses = filteredAndSortedCourses.slice(startIndex, startIndex + coursesPerPage)

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedLevel, sortBy])

  const CourseCard = ({ course }) => {
    const CategoryIcon = categoryIcons[course.category] || BookOpen
    
    return (
      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
              course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {course.level}
            </span>
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
            <Play className="h-4 w-4 text-blue-600" />
          </div>
          <div className="absolute bottom-4 right-4 bg-purple-600 text-white px-2 py-1 rounded-full flex items-center text-xs">
            <Coins className="h-3 w-3 mr-1" />
            +{course.tokenReward} EDOO
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-2">
            <CategoryIcon className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-500">{course.category}</span>
          </div>
          
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
          
          <div className="flex items-center mb-4">
            <img 
              src={`https://images.unsplash.com/photo-150${course.id}003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face`}
              alt={course.instructor}
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="text-sm text-gray-700">by {course.instructor}</span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">{course.students.toLocaleString()}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{course.duration}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">{course.price} ETH</span>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors duration-200">
              Enroll Now
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  const Pagination = () => (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border bg-white border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1
        const isCurrentPage = page === currentPage
        
        // Show first page, last page, current page, and pages around current page
        if (
          page === 1 || 
          page === totalPages || 
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                isCurrentPage
                  ? 'bg-blue-600 text-white'
                  : 'border bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        } else if (page === currentPage - 2 || page === currentPage + 2) {
          return <span key={page} className="px-2">...</span>
        }
        return null
      })}
      
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Edoo</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/courses" className="text-blue-600 font-medium">Courses</a>
            <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Explore Courses</h1>
          <p className="text-xl text-purple-100 mb-8">
            Discover cutting-edge Web3 courses and earn tokens while you learn
          </p>
          <div className="flex items-center justify-center space-x-8 text-purple-100">
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              <span>Verified Certificates</span>
            </div>
            <div className="flex items-center">
              <Coins className="h-5 w-5 mr-2" />
              <span>Token Rewards</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>Community Learning</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses, instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-4 py-2 border bg-white border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
            
            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="lg:hidden mt-4 p-4 bg-gray-50 rounded-lg space-y-4"
            >
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Info */}
      <section className="py-4 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + coursesPerPage, filteredAndSortedCourses.length)} of {filteredAndSortedCourses.length} courses
            </p>
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {currentCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              
              {totalPages > 1 && <Pagination />}
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <span className="text-xl font-bold">Edoo</span>
              </div>
              <p className="text-gray-400">Empowering learners worldwide with Web3 technology.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/courses">Courses</a></li>
                <li><a href="/instructors">Become Instructor</a></li>
                <li><a href="/tokenomics">Tokenomics</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/whitepaper">Whitepaper</a></li>
                <li><a href="/docs">Documentation</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about">About</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Edoo. All rights reserved. Built on Web3.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}