import React, { useState } from "react";

const faqData = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for unused and unworn items with the original tags and packaging. Refunds will be processed within 5–7 business days.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders are typically delivered within 3–5 business days depending on your location. You’ll receive tracking details via email after dispatch.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes, we offer free shipping on all orders above ₹999. For orders below that amount, a small shipping fee may apply.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be changed or canceled within 1 hour of placing them. Please contact our support team as soon as possible.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you’ll receive an email and SMS with a tracking link to follow the progress of your delivery.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl sm:text-4xl font-serif text-neutral-800 tracking-wide text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border-b pb-4">
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full text-left flex justify-between items-center font-serif font-medium text-gray-800 hover:text-pink-600 transition-colors duration-200"
            >
              <span>{item.question}</span>
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600 font-serif text-2xl md:text-base leading-relaxed">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
