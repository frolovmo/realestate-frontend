"use client";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const faqs = [
  { 
    question: "What is the Real Estate platform?",
    answer: "The Real Estate platform, powered by IZE Tech, connects individuals with affordable housing options, financial support, and expert home-buying assistance."
  },
  { 
    question: "Who is eligible for a real estate loan?", 
    answer: "Anyone with a stable income, a valid national ID, and the ability to meet basic loan requirements is eligible." 
  },
  { 
    question: "How long does the loan approval process take?", 
    answer: "The approval process typically takes between 7 to 14 business days, depending on the required documentation." 
  },
  { 
    question: "What types of collateral are accepted?", 
    answer: "Commonly accepted collateral includes land titles, savings, and other fixed assets, depending on the financial institution’s terms." 
  },
  { 
    question: "What are the benefits of buying through the platform?",
    answer: "The platform gives you access to affordable homes, expert financial advice, and a streamlined purchasing process in one secure place."
  },
  { 
    question: "Can I buy a home if I’m self-employed?", 
    answer: "Yes! We work with financial institutions that offer mortgage solutions for self-employed individuals, provided they can show a stable income." 
  },
  { 
    question: "Are there any additional costs apart from the property price?", 
    answer: "Yes, additional costs may include legal fees, loan processing fees, and property registration charges. Our experts will guide you through the details." 
  },
  { 
    question: "Can I visit the property before purchasing?", 
    answer: "Absolutely! We encourage potential homeowners to schedule a visit to their preferred properties before making a final decision." 
  },
  { 
    question: "What happens if I’m unable to make my loan payments?", 
    answer: "If you face financial difficulties, we recommend contacting your financing institution as soon as possible. Some lenders offer restructuring options to help manage payments." 
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="brand-glow brand-grid flex min-h-[70vh] w-full flex-col items-center justify-evenly gap-10 px-6 py-16 text-white md:flex-row">
        <div className="md:w-[40%] w-full text-center md:text-left">
            <span className="brand-kicker mb-5 border-white/20 bg-white/10 text-primary">Helpful answers</span>
            <h2 className="text-3xl font-bold leading-tight md:text-6xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-sm text-white/65 md:text-base">
              If this is your first time using the platform, here are answers
              to the most common questions about finding and applying for a home.
            </p>
        </div>
        <div className="md:w-[40%] p-2">
            {faqs.map((faq, index) => (
              <div key={index} className="">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center gap-x-3 border-b border-white/10 py-3 text-left text-base font-semibold text-white/85 transition-all duration-300 hover:text-primary"
                >
                  <FaChevronRight size={18} className={`transform text-primary transition-all duration-300 ${openIndex === index ? "rotate-90" : ""}`} />
                  {faq.question}
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-30" : "max-h-0"} ease-in-out`}>
                  <p className="pb-2 md:text-sm text-xs pl-6">{faq.answer}</p>
                </div>
              </div>
            ))}
        </div>
    </section>
  );
};

export default FAQSection;
