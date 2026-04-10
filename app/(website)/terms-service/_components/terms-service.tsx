import React from 'react';

const TermsService = () => {
  const primaryColor = "#139a8e";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Hero Header */}
          <div 
            className="relative px-8 py-10 text-center overflow-hidden"
            style={{ backgroundColor: primaryColor }}
          >
            {/* Decorative subtle pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">Terms & Conditions</h1>
              <div className="inline-flex items-center gap-2 text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mt-2">
                <i className="fas fa-gavel text-xs"></i>
                <span>Free Instrument Repair Directory — United States</span>
              </div>
              <div className="mt-5">
                <span className="inline-flex items-center gap-2 text-sm bg-white/10 px-4 py-1.5 rounded-full font-medium">
                  <i className="far fa-calendar-alt"></i>
                  Effective Date: April 10, 2026
                </span>
              </div>
            </div>
          </div>

          {/* Plain English Summary Card */}
          <div className="px-6 sm:px-8 -mt-6 relative z-20">
            <div 
              className="bg-emerald-50 rounded-xl p-6 shadow-sm border-l-8"
              style={{ borderLeftColor: primaryColor }}
            >
              <div className="flex items-start gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm" style={{ color: primaryColor }}>
                  <i className="fas fa-pen-fancy text-xl"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: primaryColor }}>Plain-English Summary</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Instrufix is a free directory to help you find instrument repair shops. We do not process payments, 
                    handle transactions, or touch your instrument. We do not sell your data. We are a small startup 
                    and some things will evolve — we will always be upfront about changes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="px-6 sm:px-8 py-8 space-y-8 text-gray-700">
            
            {/* 1. What Instrufix Is */}
            <section className="group">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                  <i className="fas fa-info-circle text-sm" style={{ color: primaryColor }}></i>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-800">What Instrufix Is</h2>
              </div>
              <p className="leading-relaxed">
                Instrufix is a free online directory that connects musicians with instrument repair shops
                and technicians across the United States. Our current listings are focused on the San
                Francisco Bay Area, where we started, but the Platform is open to users and businesses
                nationwide. Our goal is simple: make it easier for musicians to find skilled repair
                professionals near them.
              </p>
            </section>

            {/* 2. What Instrufix Is Not */}
            <section>
              <div className="flex items-center gap-3 border-b border-gray-100 pb-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                  <i className="fas fa-ban text-sm" style={{ color: primaryColor }}></i>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-800">What Instrufix Is Not</h2>
              </div>
              <p className="mb-4">We want to be completely transparent about what we do not do:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Process payments between you and Repair Shops",
                  "Facilitate bookings, appointments, or scheduling",
                  "Handle, receive, or ship instruments",
                  "Provide repair quotes or guarantee any pricing",
                  "Fulfill any orders or services of any kind",
                  "Make money from this platform at this time",
                  "Sell your personal data — to anyone, ever"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-gray-50 rounded-lg p-2.5">
                    <i className="fas fa-times-circle text-sm mt-0.5" style={{ color: primaryColor }}></i>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Accepting These Terms */}
            <section>
              <div className="flex items-center gap-3 border-b border-gray-100 pb-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                  <i className="fas fa-check-circle text-sm" style={{ color: primaryColor }}></i>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-800">Accepting These Terms</h2>
              </div>
              <p className="leading-relaxed">
                By visiting or using the Instrufix platform (the "Platform"), you agree to these Terms and
                Conditions ("Terms"). If you do not agree, please do not use the Platform. We may update these 
                Terms as Instrufix grows. Continuing to use the Platform after changes take effect means you accept them.
              </p>
            </section>

            {/* 4. Who Can Use */}
            <section>
              <div className="flex items-center gap-3 border-b border-gray-100 pb-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                  <i className="fas fa-user-check text-sm" style={{ color: primaryColor }}></i>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-800">Who Can Use Instrufix</h2>
              </div>
              <p>
                You must be at least 13 years old to use the Platform. If you are between 13 and 17, you
                should have a parent or guardian review these Terms with you.
              </p>
            </section>

            {/* 5. Accounts */}
            <section>
              <div className="flex items-center gap-3 border-b border-gray-100 pb-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                  <i className="fas fa-user-circle text-sm" style={{ color: primaryColor }}></i>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-800">Accounts</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2"><i className="fas fa-eye" style={{ color: primaryColor }}></i> No Account Required to Browse</h3>
                  <p className="text-sm mt-1">Anyone can browse the Instrufix directory without registering.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2"><i className="fas fa-user-plus" style={{ color: primaryColor }}></i> Customer Accounts</h3>
                  <p className="text-sm mt-1">Registered Customers have access to personal profiles, reviews, photo uploads, messaging, and saving listings.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2"><i className="fas fa-store" style={{ color: primaryColor }}></i> Business Accounts</h3>
                  <p className="text-sm mt-1">Repair Shops may create a free business account to claim listings, manage profile information, and respond to Customer messages.</p>
                </div>
              </div>
            </section>

            {/* 8. Messaging Feature */}
            <section>
              <div className="flex items-center gap-3 border-b border-gray-100 pb-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                  <i className="fas fa-comment-dots text-sm" style={{ color: primaryColor }}></i>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-800">Messaging Feature</h2>
              </div>
              <p>
                Instrufix provides the messaging infrastructure but is <strong>not a party</strong> to any conversation. 
                Any quote, appointment, or agreement reached through messaging is solely between the Customer and the Repair Shop.
              </p>
            </section>

            {/* Disclaimer of Warranties - Highlight Box */}
            <div className="rounded-xl border-l-8 bg-gray-50 p-5 my-6" style={{ borderLeftColor: primaryColor }}>
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-exclamation-triangle text-sm" style={{ color: primaryColor }}></i>
                <h3 className="font-bold uppercase tracking-wide text-gray-800 text-sm">Disclaimer of Warranties</h3>
              </div>
              <p className="text-xs font-mono text-gray-600 leading-relaxed">
                THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE." INSTRUFIX MAKES NO WARRANTIES REGARDING 
                THE ACCURACY, COMPLETENESS, RELIABILITY, OR AVAILABILITY OF THE PLATFORM. USE IS ENTIRELY AT YOUR OWN RISK.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="rounded-xl border-l-8 bg-gray-50 p-5 my-6" style={{ borderLeftColor: primaryColor }}>
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-gavel text-sm" style={{ color: primaryColor }}></i>
                <h3 className="font-bold uppercase tracking-wide text-gray-800 text-sm">Limitation of Liability</h3>
              </div>
              <p className="text-xs font-mono text-gray-600 leading-relaxed">
                IN NO EVENT SHALL INSTRUFIX BE LIABLE FOR ANY DAMAGES ARISING FROM YOUR USE OF THE PLATFORM, 
                INCLUDING DAMAGE TO YOUR INSTRUMENT. OUR TOTAL LIABILITY IS LIMITED TO $100 USD.
              </p>
            </div>

            {/* Extended sections from original content: Indemnification, Governing Law, Changes */}
            <section>
              <div className="flex items-center gap-3 border-b border-gray-100 pb-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                  <i className="fas fa-shield-alt text-sm" style={{ color: primaryColor }}></i>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-800">Indemnification & Governing Law</h2>
              </div>
              <p className="mb-2">You agree to defend, indemnify, and hold harmless Instrufix from any claims arising from your use of the Platform.</p>
              <p>These Terms are governed by the laws of the State of California, with exclusive jurisdiction in San Mateo County.</p>
            </section>

            {/* Contact & Footer */}
            <div className="pt-8 mt-6 text-center border-t border-gray-200">
              <div className="inline-flex flex-col items-center gap-1">
                <div className="bg-white px-5 py-2 rounded-full shadow-sm inline-flex items-center gap-2" style={{ border: `1px solid ${primaryColor}20` }}>
                  <i className="far fa-envelope" style={{ color: primaryColor }}></i>
                  <span className="font-medium">Questions?</span>
                  <a href="mailto:contact@instrufix.com" className="font-bold hover:underline" style={{ color: primaryColor }}>contact@instrufix.com</a>
                </div>
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                  <span><i className="far fa-copyright"></i> Instrufix</span>
                  <span>www.instrufix.com</span>
                  <span>v2.0 — April 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* subtle footer note */}
        <div className="text-center mt-6 text-xs text-gray-400">
          <i className="fas fa-music"></i> Keeping musicians connected with trusted repair shops.
        </div>
      </div>
    </div>
  );
};

export default TermsService;