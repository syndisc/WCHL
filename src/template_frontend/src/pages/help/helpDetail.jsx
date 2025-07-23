import { useParams } from 'react-router-dom';

const helpDetails = {
  'my-account': {
    title: 'My Account',
    detail: 'This is the detail page for managing your Brevo account.',
  },
  'email-campaigns': {
    title: 'Email Campaigns',
    detail: 'This page explains how to manage your email campaigns effectively.',
  },
  'whatsapp-sms': {
    title: 'WhatsApp & SMS',
    detail: 'Learn how to send and manage messages via WhatsApp and SMS.',
  },
  'transactional-emails': {
    title: 'Transactional Emails',
    detail: 'Details about sending transactional emails with deliverability tracking.',
  },
  'contacts': {
    title: 'Contacts',
    detail: 'Understand how to organize and use your contacts efficiently.',
  },
  'automation': {
    title: 'Automation',
    detail: 'Set up workflows to automate your marketing strategies.',
  },
};

export default function HelpDetail() {
  const { slug } = useParams();
  const content = helpDetails[slug] || { title: 'Not Found', detail: 'The topic you are looking for does not exist.' };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
      <p className="text-gray-700">{content.detail}</p>
    </div>
  );
}
