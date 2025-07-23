import { useParams } from 'react-router-dom';
import { Book, Mail, MessageCircle, Send, Users, Zap, ArrowLeft, Clock, Tag } from 'lucide-react';

const helpDetails = {
  'account-management': {
    title: 'Account Settings & Profile',
    detail: 'Complete guide to managing your personal account settings, updating profile information, configuring security preferences, and customizing your dashboard experience.',
    icon: Users,
    category: 'Account Management',
    readTime: '5 min read',
    lastUpdated: 'Updated 2 days ago',
    tips: [
      'Enable two-factor authentication for enhanced security',
      'Regularly update your profile information',
      'Customize notification preferences to stay informed'
    ]
  },
  'courses-learning': {
    title: 'Email Campaign Mastery',
    detail: 'Learn to create compelling email campaigns that drive engagement. This comprehensive guide covers campaign design, audience segmentation, A/B testing strategies, and performance analytics.',
    icon: Mail,
    category: 'Marketing Tools',
    readTime: '8 min read',
    lastUpdated: 'Updated 1 week ago',
    tips: [
      'Test different subject lines to improve open rates',
      'Segment your audience for better targeting',
      'Monitor click-through rates and adjust content accordingly'
    ]
  },
  'communication-support': {
    title: 'Multi-Channel Messaging',
    detail: 'Master WhatsApp Business API and SMS marketing to reach customers on their preferred platforms. Includes setup guides, best practices, and compliance requirements.',
    icon: MessageCircle,
    category: 'Communication',
    readTime: '6 min read',
    lastUpdated: 'Updated 3 days ago',
    tips: [
      'Respect opt-in preferences for SMS campaigns',
      'Use WhatsApp templates for business messaging',
      'Track delivery rates across different channels'
    ]
  },
  'assignments-quizzes': {
    title: 'Transactional Email Excellence',
    detail: 'Ensure critical emails reach their destination with our transactional email service. Learn about delivery optimization, template customization, and real-time tracking.',
    icon: Send,
    category: 'Email Delivery',
    readTime: '4 min read',
    lastUpdated: 'Updated 5 days ago',
    tips: [
      'Use dedicated IPs for high-volume sending',
      'Implement proper SPF and DKIM authentication',
      'Monitor bounce rates and maintain clean lists'
    ]
  },
  'community-networking': {
    title: 'Contact Management System',
    detail: 'Organize, segment, and nurture your contact database effectively. Learn advanced filtering, custom fields, import/export processes, and automated contact scoring.',
    icon: Book,
    category: 'Data Management',
    readTime: '7 min read',
    lastUpdated: 'Updated 4 days ago',
    tips: [
      'Create custom fields for better contact organization',
      'Set up automated contact scoring systems',
      'Regular database cleanup improves deliverability'
    ]
  },
  'technical-issues': {
    title: 'Marketing Automation Workflows',
    detail: 'Build sophisticated automation workflows that nurture leads and drive conversions. Covers trigger setup, conditional logic, multi-step sequences, and performance tracking.',
    icon: Zap,
    category: 'Automation',
    readTime: '10 min read',
    lastUpdated: 'Updated 1 day ago',
    tips: [
      'Start with simple workflows and gradually add complexity',
      'Test automation flows before activating',
      'Monitor workflow performance and optimize regularly'
    ]
  },
};

export default function HelpDetail() {
  const { slug } = useParams();
  const content = helpDetails[slug] || {
    title: 'Page Not Found',
    detail: 'Sorry, the help topic you are looking for does not exist. Please check the URL or browse our help categories.',
    icon: Book,
    category: 'Error',
    readTime: '',
    lastUpdated: '',
    tips: []
  };

  const IconComponent = content.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <button className="flex items-center text-blue-600 bg-white hover:text-blue-800 mb-4 transition-colors" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Help Center
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {content.category}
                  </span>
                  <h1 className="text-3xl font-bold">{content.title}</h1>
                </div>
              </div>
              
              {content.readTime && (
                <div className="flex items-center space-x-6 text-blue-100">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{content.readTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    <span className="text-sm">{content.lastUpdated}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Content Section */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  {content.detail}
                </p>
              </div>
              
              {/* Tips Section */}
              {content.tips && content.tips.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <Zap className="w-5 h-5 text-green-600" />
                    </div>
                    Pro Tips
                  </h3>
                  <ul className="space-y-3">
                    {content.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-green-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Need More Help?
            </h3>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}