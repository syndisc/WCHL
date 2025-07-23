import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { 
  BookOpen, 
  Users, 
  Shield, 
  Coins, 
  Globe, 
  Award,
  Zap,
  Lock,
  TrendingUp,
  Target,
  Heart,
  Lightbulb,
  ArrowRight,
  CheckCircle
} from "lucide-react"
import { Link } from "react-router-dom"
import { Navbar } from "@/components/navbar"

const TEAM_MEMBERS = [
  {
    id: '1',
    name: 'Zenli Huangtara',
    role: 'Lead Developer',
    image: "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: 'Oversees technical architecture and development processes. Expert in scalable systems and team leadership.  ',
    tag: 'Lead Dev'
  },
  {
    id: '2',
    name: 'Dhannyo Putta',
    role: 'AI/ML Engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Develops and deploys machine learning models for intelligent features and data-driven insights.',
    tag: 'Artificial Intelligence'
  },
  {
    id: '3',
    name: 'Alvin Wijaya',
    role: 'Front-End Engineer',
    image: 'https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Specializes in building intuitive and performant user interfaces with React and modern web technologies.',
    tag: 'Front End'
  },
  {
    id: '4',
    name: 'Willard Tio',
    role: 'Quality Assurance',
    image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Analyzes complex datasets to identify trends, create reports, and support strategic decision-making.',
    tag: 'Analyst'
  },
  {
    id: '5',
    name: 'Bryan Viriya Kurniawan',
    role: 'Business Analyst',
    image: 'https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Experienced in digital marketing strategies, brand building, and community engagement in tech.',
    tag: 'Analyst'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white">
      {/* Header */}
      <Navbar className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50" activePath="/about" />
      {/* <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Edoo</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link to="/courses" className="text-gray-600 hover:text-blue-600">Courses</Link>
            <Link to="/about" className="text-blue-600 font-medium">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
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
      </header> */}

      {/* Hero Section */}
      <section className="py-24 px-4">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-sm font-medium text-purple-700 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="h-4 w-4 mr-2" />
            Powered by Web3 Technology
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            The Future of 
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Learning</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're revolutionizing education with blockchain technology, creating a decentralized learning ecosystem 
            where knowledge is truly owned, verified, and rewarded.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="px-8 bg-gradient-to-r from-purple-600 to-blue-600">
                Join the Revolution
              </Button>
            </Link>
            <Link to="/whitepaper">
              <Button size="lg" variant="outline" className="px-8">
                Read Our Whitepaper
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
        <motion.div
          className="container mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-2 border-purple-100 hover:border-purple-200 transition-colors">
              <CardHeader className="text-center">
                <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  To democratize education by leveraging blockchain technology, creating a transparent, 
                  secure, and ownership-based learning ecosystem where learners truly own their achievements 
                  and educators are fairly rewarded for their contributions.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
              <CardHeader className="text-center">
                <Lightbulb className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  A world where education is borderless, credentials are universally recognized, 
                  and learning is incentivized through tokenized rewards. We envision a future where 
                  knowledge sharing creates sustainable economic value for all participants.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* Web3 Features */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <motion.div
          className="container mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Web3 Learning?</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Traditional education systems are centralized and lack true ownership. 
              Our Web3 approach puts learners in control of their educational journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Shield className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Verified Credentials</h3>
              <p className="text-purple-100">
                Immutable certificates stored on blockchain. Your achievements are permanently 
                verified and globally recognized without intermediaries.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Coins className="h-12 w-12 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Token Rewards</h3>
              <p className="text-purple-100">
                Earn EDOO tokens for completing courses, contributing content, and helping peers. 
                Turn your learning into tangible value.
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Lock className="h-12 w-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">True Ownership</h3>
              <p className="text-purple-100">
                Own your learning data, control access to your information, and take your 
                credentials anywhere without platform dependency.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-gray-50">
        <motion.div
          className="container mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  Founded in 2025 by a team of educators, blockchain developers, and crypto enthusiasts, 
                  Edoo emerged from a simple frustration: traditional online learning platforms don't 
                  truly serve learners or educators.
                </p>
                <p>
                  We witnessed countless talented individuals struggling to prove their skills because 
                  their certificates weren't recognized across institutions. We saw educators creating 
                  amazing content but receiving minimal compensation from centralized platforms.
                </p>
                <p>
                  That's when we realized blockchain technology could solve these fundamental problems. 
                  By creating a decentralized learning ecosystem, we could give learners true ownership 
                  of their achievements and provide educators with fair, transparent compensation.
                </p>
                <div className="flex items-center space-x-2 text-purple-600 font-semibold">
                  <Heart className="h-5 w-5" />
                  <span>Built by learners, for learners</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" 
                alt="Team collaboration" 
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">2025</div>
                <div className="text-sm">Founded</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-16 bg-white">
        {/* <motion.div
          className="container mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A diverse group of innovators passionate about transforming education through technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "CEO & Co-Founder",
                bio: "Former EdTech executive with 10+ years in online education. Stanford MBA, passionate about democratizing learning.",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face",
                expertise: "Education Strategy"
              },
              {
                name: "Alex Rodriguez",
                role: "CTO & Co-Founder",
                bio: "Blockchain architect with experience at ConsenSys. Built multiple DApps and smart contract systems.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
                expertise: "Blockchain Development"
              },
              {
                name: "Maya Patel",
                role: "Head of Product",
                bio: "Product designer focused on Web3 UX. Previously led design at crypto startups and traditional tech companies.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
                expertise: "Product Design"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <div className="text-purple-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  {member.expertise}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A diverse group of innovators passionate about transforming education through technology
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="container mx-auto"
        >
        <CarouselContent>
          {TEAM_MEMBERS.map((member, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <div className="mx-3 my-2 bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <div className="text-purple-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  {member.tag}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <motion.div
          className="container mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Built on Cutting-Edge Technology</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our platform leverages the latest in blockchain and Web3 technologies to deliver 
              a seamless, secure, and scalable learning experience.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Ethereum", desc: "Smart Contracts" },
              { name: "IPFS", desc: "Decentralized Storage" },
              { name: "Polygon", desc: "Layer 2 Scaling" },
              { name: "MetaMask", desc: "Wallet Integration" },
              { name: "Chainlink", desc: "Oracle Network" },
              { name: "The Graph", desc: "Data Indexing" },
              { name: "React", desc: "Frontend Framework" },
              { name: "Node.js", desc: "Backend Services" }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-bold text-purple-400 mb-1">{tech.name}</h4>
                <p className="text-gray-400 text-sm">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-blue-50">
        <motion.div
          className="container mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Globe,
                title: "Accessibility",
                description: "Education should be accessible to everyone, regardless of location or background."
              },
              {
                icon: Shield,
                title: "Transparency",
                description: "Open-source development and transparent reward mechanisms build trust."
              },
              {
                icon: Users,
                title: "Community",
                description: "Learning is collaborative. We foster connections between learners globally."
              },
              {
                icon: TrendingUp,
                title: "Innovation",
                description: "We continuously push boundaries to improve the learning experience."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <motion.div
          className="container mx-auto text-center"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Shape the Future of Learning?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners and educators who are already part of the Web3 education revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="px-8 bg-white text-purple-600 hover:bg-gray-100">
                Start Your Journey
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" className="px-8 bg-white text-purple-600 hover:bg-gray-100 ">
                Partner With Us
              </Button>
            </Link>
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
              <p className="text-gray-400">Empowering learners worldwide with Web3 technology.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/instructors">Become Instructor</Link></li>
                <li><Link to="/tokenomics">Tokenomics</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/whitepaper">Whitepaper</Link></li>
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Edoo. All rights reserved. Built on Web3.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}