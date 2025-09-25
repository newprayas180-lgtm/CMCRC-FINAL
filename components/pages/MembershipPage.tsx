
import React, { useRef } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import useOnScreen from '../hooks/useOnScreen';

const benefits = [
    {
        title: "Skill Development",
        description: "Enhance your research methodologies and critical analysis abilities."
    },
    {
        title: "Networking",
        description: "Connect with a vibrant community of peers, mentors, and faculty."
    },
     {
        title: "Mentorship",
        description: "Receive guidance and support from experienced researchers."
    },
    {
        title: "Exclusive Resources",
        description: "Gain access to specialized workshops, databases, and tools."
    },
];

const steps = [
    {
        step: "01",
        title: "Apply Online",
        description: "Fill out our simple online application form with your details."
    },
    {
        step: "02",
        title: "Pay Fee",
        description: "Complete the payment for the annual membership fee securely."
    },
    {
        step: "03",
        title: "Get Confirmed",
        description: "Receive your confirmation and start your research journey with us!"
    }
];


const MembershipPage: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const isContentVisible = useOnScreen(contentRef);

  return (
    <PageWrapper>
      <SectionHeader title="Join Our Community" subtitle="Become a CMCRC Member" />
      
      <div ref={contentRef} className={`max-w-4xl mx-auto grid grid-cols-1 gap-y-20 ${isContentVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        {/* Top Section: Benefits */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-8">Why join CMCRC?</h2>
          <div className="space-y-6 inline-block">
            {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 text-left">
                    <div className="flex-shrink-0 mt-1 flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">{benefit.title}</h3>
                        <p className="text-slate-600">{benefit.description}</p>
                    </div>
                </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Steps to Join */}
        <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-800 mb-8">Ready To Research?</h2>
            <div className="max-w-lg mx-auto bg-white p-10 rounded-xl shadow-lg">
                <div className="space-y-4">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.step}>
                            <div className="flex items-start space-x-4 text-left">
                                <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 bg-blue-100 text-blue-600 rounded-full text-xl font-bold">{step.step}</div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1 text-slate-800">{step.title}</h3>
                                    <p className="text-slate-600">{step.description}</p>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="pl-6 h-10 my-1">
                                    <div className="w-1 h-full bg-slate-300 rounded"></div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="mt-12 text-center">
              <Button to="#" className="text-lg py-4 px-12">Apply Now</Button>
            </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MembershipPage;
