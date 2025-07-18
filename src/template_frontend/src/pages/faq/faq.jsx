import React, { useState, useEffect } from 'react';
import { ChevronDown, X, HelpCircle, Search, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { useLMS } from '../../hooks/useLMS';

export default function FAQPage() {
    const { getFAQs, loading, error } = useLMS();
    const [faqs, setFaqs] = useState([]);
    const [filteredFaqs, setFilteredFaqs] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingError, setLoadingError] = useState('');

    // Default FAQs in case backend doesn't have any
    const defaultFaqs = [
        {
            id: 1,
            question: "How do I enroll in a course?",
            answer: "To enroll in a course, browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. You'll need to create an account if you don't have one already."
        },
        {
            id: 2,
            question: "Can I access courses on mobile devices?",
            answer: "Yes! Our platform is fully responsive and works on all devices including smartphones, tablets, and desktop computers. You can learn anywhere, anytime."
        },
        {
            id: 3,
            question: "Do I get a certificate after completing a course?",
            answer: "Yes, you'll receive a certificate of completion for each course you finish. Certificates can be downloaded from your dashboard and shared on professional networks."
        },
        {
            id: 4,
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment system."
        },
        {
            id: 5,
            question: "Can I get a refund if I'm not satisfied?",
            answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with a course, you can request a full refund within 30 days of purchase."
        },
        {
            id: 6,
            question: "How long do I have access to a course?",
            answer: "Once you enroll in a course, you have lifetime access to all course materials, including any future updates and additional content."
        },
        {
            id: 7,
            question: "Are there any prerequisites for courses?",
            answer: "Prerequisites vary by course and are clearly listed on each course page. Some beginner courses have no prerequisites, while advanced courses may require prior knowledge."
        },
        {
            id: 8,
            question: "Can I interact with instructors and other students?",
            answer: "Yes! Each course has discussion forums where you can ask questions, share insights, and connect with instructors and fellow students."
        },
        {
            id: 9,
            question: "How do I track my learning progress?",
            answer: "Your dashboard shows detailed progress for each enrolled course, including completed lessons, quiz scores, and overall completion percentage."
        },
        {
            id: 10,
            question: "What if I need technical support?",
            answer: "Our support team is available 24/7 to help with any technical issues. You can reach us through the help center, email, or live chat."
        }
    ];

    useEffect(() => {
        loadFAQs();
    }, []);

    useEffect(() => {
        filterFAQs();
    }, [faqs, searchTerm]);

    const loadFAQs = async () => {
        try {
            const result = await getFAQs();
            if (result.success && result.data && result.data.length > 0) {
                setFaqs(result.data);
            } else {
                // Use default FAQs if backend doesn't have any
                setFaqs(defaultFaqs);
            }
        } catch (err) {
            console.error("FAQ loading error:", err);
            // Use default FAQs on error
            setFaqs(defaultFaqs);
        }
    };

    const filterFAQs = () => {
        if (!searchTerm) {
            setFilteredFaqs(faqs);
            return;
        }

        const filtered = faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFaqs(filtered);
    };

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto p-6">
                <div className="text-center mb-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                    <h1 className="text-2xl font-bold">Loading FAQs...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="text-center mb-8">
                <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
                <p className="text-gray-600">Find answers to common questions about our learning platform</p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search FAQs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 py-3 text-lg"
                    />
                </div>
            </div>

            {/* Error Message */}
            {(loadingError || error) && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md mb-6 max-w-2xl mx-auto">
                    <AlertCircle className="h-5 w-5" />
                    <span>{loadingError || error}</span>
                </div>
            )}

            <Card className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <div className="max-w-3xl mx-auto">
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-12">
                            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {searchTerm ? 'No FAQs match your search' : 'No FAQs available'}
                            </h3>
                            <p className="text-gray-600">
                                {searchTerm 
                                    ? 'Try adjusting your search terms or browse all FAQs' 
                                    : 'Check back later for frequently asked questions'
                                }
                            </p>
                            {searchTerm && (
                                <Button 
                                    variant="outline" 
                                    onClick={() => setSearchTerm('')}
                                    className="mt-4"
                                >
                                    Clear Search
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFaqs.map((faq, index) => (
                                <div key={faq.id || index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                    <Button
                                        className="w-full flex justify-between items-center p-6 text-left font-medium text-lg bg-white hover:bg-gray-50 transition-colors border-0 rounded-none"
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <span className="text-gray-900 pr-4">{faq.question}</span>
                                        <div className="flex-shrink-0">
                                            {openIndex === index ? (
                                                <X className="w-5 h-5 text-gray-500" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            )}
                                        </div>
                                    </Button>
                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-6 text-gray-700 bg-gray-50 leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Card>

            {/* Contact Support Section */}
            <div className="max-w-2xl mx-auto mt-12 text-center">
                <Card className="p-6 bg-blue-50 border-blue-200">
                    <HelpCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Still have questions?</h3>
                    <p className="text-gray-600 mb-4">
                        Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Contact Support
                        </Button>
                        <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                            Visit Help Center
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
