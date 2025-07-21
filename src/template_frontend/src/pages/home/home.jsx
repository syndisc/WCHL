import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { BookOpen, Users, Award, Star, Play, CheckCircle, TrendingUp, Globe, Clock } from "lucide-react"

export default function HomePage() {
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
            <Link to="/courses-guest" className="text-gray-600 hover:text-blue-600">
              Courses
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link to="/help" className="text-gray-600 hover:text-blue-600">
              Help
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              About Us
            </Link>
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

      {/* Hero / Jumbotron */}
      <section className="py-24 px-4">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl font-extrabold text-gray-900 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Learn Without Limits
          </motion.h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Access thousands of courses, connect with expert instructors, and advance your career with our comprehensive learning platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="px-8">
                Start Learning Today
              </Button>
            </Link>
            <Link to="/dashboard/browse">
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Browse Courses
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 px-4 bg-white">
        <motion.div
          className="container mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Programming", courses: "120+ courses", color: "bg-blue-100 text-blue-700" },
              { name: "Design", courses: "85+ courses", color: "bg-purple-100 text-purple-700" },
              { name: "Business", courses: "90+ courses", color: "bg-green-100 text-green-700" },
              { name: "Marketing", courses: "65+ courses", color: "bg-orange-100 text-orange-700" },
              { name: "Data Science", courses: "75+ courses", color: "bg-red-100 text-red-700" },
              { name: "Photography", courses: "40+ courses", color: "bg-yellow-100 text-yellow-700" }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                className={`${category.color} rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm opacity-80">{category.courses}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4 bg-gray-50">
        <motion.div
          className="container mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Complete Web Development Bootcamp",
                instructor: "Sarah Johnson",
                rating: 4.9,
                students: "12,543",
                price: "$89",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"
              },
              {
                title: "Digital Marketing Mastery",
                instructor: "Mike Chen",
                rating: 4.8,
                students: "8,921",
                price: "$79",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
              },
              {
                title: "UI/UX Design Fundamentals",
                instructor: "Emily Rodriguez",
                rating: 4.9,
                students: "6,432",
                price: "$69",
                image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop"
              }
            ].map((course, index) => (
              <motion.div
                key={course.title}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                    <Play className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-3">by {course.instructor}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{course.rating}</span>
                      <span className="ml-2 text-sm text-gray-500">({course.students} students)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                    <Button size="sm">Enroll Now</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Iframe Video */}
      <section className="py-16 px-4 bg-white">
        <motion.div
          className="container mx-auto flex flex-col items-center gap-8"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center">Explore How Edoo Works</h2>
          <iframe
            className="w-full max-w-4xl h-64 md:h-96 rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/5MgBikgcWnY?rel=0"
            title="Introduction to Learning"
            allowFullScreen
          />
        </motion.div>
      </section>

      {/* Student Success Stories */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <motion.div
          className="container mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Thompson",
                role: "Software Developer at Google",
                content: "Edoo transformed my career. The web development course gave me the skills I needed to land my dream job.",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
              },
              {
                name: "Maria Garcia",
                role: "Marketing Manager",
                content: "The digital marketing course was incredibly comprehensive. I increased our company's online engagement by 300%.",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=60&h=60&fit=crop&crop=face"
              },
              {
                name: "James Wilson",
                role: "Freelance Designer",
                content: "The UI/UX design course helped me transition from graphic design to digital. Now I'm booking clients months in advance.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-blue-100 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-blue-50">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Learning Benefits */}
      <section className="py-16 px-4 bg-gray-50">
        <motion.div
          className="container mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Learn at Your Own Pace</h2>
              <p className="text-gray-600 mb-8">
                Our platform is designed to fit your lifestyle. Whether you're a busy professional or a dedicated student, 
                you can access our courses anytime, anywhere.
              </p>
              <div className="space-y-4">
                {[
                  { icon: CheckCircle, text: "Lifetime access to all course materials" },
                  { icon: Globe, text: "Learn from anywhere in the world" },
                  { icon: Clock, text: "Flexible scheduling that fits your life" },
                  { icon: TrendingUp, text: "Track your progress and achievements" }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <benefit.icon className="h-6 w-6 text-green-600 mr-3" />
                    <span className="text-gray-700">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Students learning" 
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Learning Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-blue-50">
        <motion.div
          className="container mx-auto"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 }
          }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Edoo?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Expert-Led Courses</CardTitle>
                <CardDescription>
                  Learn from industry professionals with real-world experience
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Interactive Learning</CardTitle>
                <CardDescription>
                  Engage with peers and instructors through discussions and projects
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Award className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Certified Learning</CardTitle>
                <CardDescription>
                  Earn certificates and badges to showcase your achievements
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <motion.div
          className="container mx-auto"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
          </div>
        </motion.div>
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
              <p className="text-gray-400">Empowering learners worldwide with quality education.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/dashboard/browse">Courses</Link></li>
                <li><Link to="/instructors">Instructors</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/community">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/privacy">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Edoo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}