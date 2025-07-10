import { Link } from 'react-router-dom';
import { Mail, User, MessageCircle, Send, Users, Zap } from 'lucide-react';

const topics = [
  { icon: <User />, title: 'My account', description: 'Create and manage your Brevo account', slug: 'my-account' },
  { icon: <Mail />, title: 'Email campaigns', description: 'Engage your contacts using the best mobile-friendly email design tools', slug: 'email-campaigns' },
  { icon: <MessageCircle />, title: 'WhatsApp & SMS', description: 'Connect directly with your contacts using targeted WhatsApp & SMS messages', slug: 'whatsapp-sms' },
  { icon: <Send />, title: 'Transactional emails', description: 'Send one-to-one emails with optimal deliverability and powerful tracking', slug: 'transactional-emails' },
  { icon: <Users />, title: 'Contacts', description: 'Manage and segment your contacts for perfectly targeted campaigns', slug: 'contacts' },
  { icon: <Zap />, title: 'Automation', description: 'Automate your marketing using emails, SMS, website tracking & more', slug: 'automation' },
];

export default function HelpCenter() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">We're here to help</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <Link
            key={index}
            to={`/help/${topic.slug}`}
            className="p-6 border rounded-xl hover:shadow-md transition bg-white flex flex-col gap-2"
          >
            <div className="text-primary w-6 h-6">{topic.icon}</div>
            <div className="text-lg font-semibold">{topic.title}</div>
            <div className="text-gray-600 text-sm">{topic.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
