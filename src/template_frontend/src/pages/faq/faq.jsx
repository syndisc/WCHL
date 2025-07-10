import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const faqs = Array.from({ length: 10 }, (_, i) => ({
  question: `Dummy Question ${i + 1}?`,
  answer: `This is the dummy answer for question ${i + 1}. You can replace it with real content.`,
}));

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h1>
    <Card
      className="max-w-2xl mx-auto p-6 bg-gray-300 shadow-lg rounded-lg"
    >
      <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-xl overflow-hidden">
            <Button
              className="w-full flex justify-between items-center p-4 text-left font-medium text-lg bg-white hover:bg-black-50 transition"
              onClick={() => toggleFAQ(index)}
            >
              <span className='text-black'>{faq.question}</span>
              {openIndex === index ? <X color="#808080" className=" w-5 h-5" /> : <ChevronDown color="#808080" className=" w-5 h-5" />}
            </Button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4 text-gray-600 bg-gray-50 overflow-hidden"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
    </Card>
      </div>
    

  );
}
