import React from "react";
import { Mail, ShieldCheck, Lock, Info, Scale } from "lucide-react";

const PrivacyPolicy = () => {
  const primaryColor = "#139a8e";

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] py-20 px-6 font-sans antialiased">
      <div className="max-w-3xl mx-auto">
        {/* --- Header Section --- */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-black">
            Privacy Policy
          </h1>
        </header>

        {/* --- Intro / Plain English Summary --- */}
        <div className="space-y-8 text-[17.5px] leading-relaxed text-gray-800">
          <p className="font-medium text-gray-900">
            Free Instrument Repair Directory — United States
          </p>

          <div
            className="bg-[#f0f9f8] p-8 rounded-xl border-l-4"
            style={{ borderColor: primaryColor }}
          >
            <h3
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: primaryColor }}
            >
              Plain-English Summary
            </h3>
            <p className="text-[#0d6b63] font-medium italic">
              &quot;We collect only the basic information needed to run a
              directory. We do not sell your data. We do not share it for
              advertising. We are a startup — we keep our data practices simple
              and will always tell you when something changes.&quot;
            </p>
          </div>

          {/* Effective Date */}
          <p className="text-sm text-gray-500 -mt-4">
            Effective Date: April 5, 2026
          </p>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              1. Who We Are
            </h2>
            <p>
              Instrufix is a free online directory helping musicians across the
              United States find instrument repair shops. Our listings currently
              focus on the San Francisco Bay Area, where Instrufix was founded,
              but the Platform is accessible and open to users and Repair Shops
              nationwide. We are an early-stage startup.
            </p>
            <p className="mt-4">
              This Privacy Policy explains what information we collect, why we
              collect it, how we use it, and your rights. If you have any
              questions, email us at{" "}
              <span className="font-semibold">support@instrufix.com</span> — we
              are a small team and we actually read these.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              2. What We Collect and Why
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-black mb-3">
                  2.1 Information You Give Us Directly
                </h3>
                <p className="mb-4">
                  When you create an account, submit content, or contact us, you
                  may provide:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Your name and email address</li>
                  <li>Profile information you choose to add to your account</li>
                  <li>Reviews you write about Repair Shops</li>
                  <li>
                    Photos you upload in connection with a repair experience
                  </li>
                  <li>
                    Business listing information you submit (for Customers
                    adding unlisted shops, or businesses managing their own
                    listing)
                  </li>
                  <li>
                    Business name, address, phone, services, and hours (for
                    Repair Shops creating or managing a listing)
                  </li>
                  <li>
                    The content of messages you send to Repair Shops through the
                    messaging feature
                  </li>
                  <li>Businesses you save to your personal list</li>
                  <li>Feedback or support messages you send to us</li>
                </ul>
                <p className="mt-4 text-sm bg-gray-50 p-4 rounded border">
                  <strong>Note:</strong> We use this information only to operate
                  the Platform, provide its features, respond to you, and
                  improve the service. Do not include sensitive personal or
                  financial information in messages — the messaging feature is
                  for instrument repair inquiries only.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-3">
                  2.2 Email Verification Data
                </h3>
                <p>
                  When you register any type of account — Customer or business —
                  we collect your email address and use it to send a
                  verification link or code. We record whether verification was
                  completed and when. This data is used solely to confirm
                  account authenticity, maintain directory integrity, and
                  communicate important account-related notices. We do not use
                  your email address for marketing without your separate opt-in
                  consent.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-3">
                  2.2 Information Collected Automatically
                </h3>
                <p>
                  Like most websites, when you visit Instrufix our servers and
                  basic analytics may automatically record:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>
                    Your IP address and approximate location (city or region
                    level — not precise GPS)
                  </li>
                  <li>Your browser type and operating system</li>
                  <li>Pages you visited and when</li>
                  <li>
                    How you arrived at the site (e.g., from a search engine)
                  </li>
                </ul>
                <p className="mt-3">
                  We use this to understand how the Platform is used and to fix
                  technical problems. We do not use this data to build
                  advertising profiles or track you across other websites.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-3">
                  2.3 Cookies
                </h3>
                <p>
                  We may use basic, functional cookies to keep the site working
                  properly — for example, to remember your language preference.
                  We do not use advertising cookies or behavioral tracking
                  cookies. You can disable cookies in your browser settings,
                  though some features may not work as expected.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-200">
                <h3 className="text-lg font-bold text-red-800 mb-2">
                  2.4 What We Do Not Collect
                </h3>
                <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                  <li>Payment information (we have no payment system)</li>
                  <li>
                    Sensitive personal information such as government IDs,
                    financial records, or health data
                  </li>
                  <li>Precise GPS location</li>
                  <li>Personal data from children under 13</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect only to:</p>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-6 text-gray-700">
              <li>
                Operate and improve the Instrufix directory and all its features
              </li>
              <li>
                Display your reviews, photos, and listing submissions on the
                Platform
              </li>
              <li>Enable your saved businesses list and sharing features</li>
              <li>Deliver messages between Customers and Repair Shops</li>
              <li>Verify accounts and maintain Platform integrity</li>
              <li>Respond to your support requests or reports</li>
              <li>Understand how the Platform is used so we can improve it</li>
              <li>
                Send you account-related notices and, if you opt in, Platform
                updates
              </li>
              <li>Enforce our Terms and respond to misconduct</li>
              <li>Comply with legal obligations when required</li>
            </ul>
            <p className="mt-4 text-sm bg-gray-50 p-4 rounded border">
              We do not use your information for advertising, and we do not
              build profiles for marketing purposes.
            </p>
          </section>

          <section className="bg-gray-900 text-white p-8 rounded-2xl my-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" /> 4. We Do Not Sell
              Your Data
            </h2>
            <p className="text-gray-300">
              We do not sell, rent, lease, or trade your personal information to
              any third party — for any reason, at any price. This is a firm
              commitment, not a policy subject to change as our business grows.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              5. How We Share Information
            </h2>
            <p className="mb-4">
              We do not share your personal information with third parties
              except in the narrow circumstances below.
            </p>
            <div className="space-y-4">
              <p>
                <strong>5.1 Service Providers:</strong> We use a small number of
                trusted third-party tools to run the Platform — such as web
                hosting, basic analytics, and email. These providers act on our
                instructions only and are contractually prohibited from using
                your data for their own purposes.
              </p>
              <p>
                <strong>5.2 Legal Requirements:</strong> If we receive a valid
                legal obligation — such as a court order or government request —
                we may be required to disclose information. We will notify you
                if we are legally permitted to do so before complying.
              </p>
              <p>
                <strong>5.3 Business Transfers:</strong> If Instrufix is ever
                acquired, merged, or its assets transferred, your information
                may be part of that transition. We will notify you and provide
                choices where possible. Any successor will be bound by this
                Privacy Policy or will give you notice of changes before they
                apply.
              </p>
              <p>
                <strong>5.4 With Your Consent:</strong> We may share your
                information in other ways if you give us explicit permission.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              6. Data Retention
            </h2>
            <p>
              We keep your information only as long as needed to operate the
              Platform and fulfill the purposes described here. Message history
              is retained to provide conversation continuity for both Customers
              and Repair Shops. If you ask us to delete your data, we will do so
              promptly unless we are legally required to keep it.
            </p>
            <p className="mt-3">
              As a startup, we aim to keep our data footprint minimal. We do not
              hold on to information we do not need.
            </p>
          </section>

          <section className="border-2 border-gray-100 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6" style={{ color: primaryColor }} /> 7.
              The Messaging Feature — Privacy Details
            </h2>
            <p className="mb-4">
              Our messaging feature allows Customers to contact Repair Shops
              that have a verified business account on the Platform. Here is how
              we handle the data involved:
            </p>
            <div className="space-y-4 text-sm">
              <p>
                <strong>7.1 What We Store:</strong> We store the content of
                messages exchanged between Customers and Repair Shops, along
                with metadata such as timestamps and which parties are involved
                in the conversation. This is necessary to deliver the feature
                and provide message history to both parties.
              </p>
              <p>
                <strong>7.2 Who Can See Your Messages:</strong> Messages are
                visible to the Customer who sent them and to the Repair Shop
                that received them. Instrufix team members may access message
                content only when investigating a reported abuse or policy
                violation, or when required by law. We do not read messages
                routinely.
              </p>
              <p>
                <strong>7.3 What Not to Include in Messages:</strong> Please do
                not send the following through the messaging feature:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Payment card numbers, bank details, or financial information
                </li>
                <li>Government-issued ID numbers or social security numbers</li>
                <li>Passwords or account credentials</li>
                <li>
                  Any information you would not want stored on a third-party
                  server
                </li>
              </ul>
              <p className="mt-2">
                The messaging feature is intended for instrument repair
                inquiries. Keep conversations relevant to your service needs.
              </p>
              <p>
                <strong>7.4 Retention of Messages:</strong> Message history is
                retained as long as both parties have active accounts on the
                Platform, or as required for legal or safety reasons. You may
                request deletion of your message history by contacting
                support@instrufix.com, subject to any legal retention
                obligations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              8. Your Privacy Rights
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-black mb-3">
                  8.1 For All Users
                </h3>
                <p>Regardless of where you live, you can contact us to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>Find out what personal information we hold about you</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of any marketing emails from us</li>
                </ul>
                <p className="mt-3">
                  Email us at support@instrufix.com. We will respond within 30
                  days.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-lg">
                  <Scale className="w-5 h-5" /> 8.2 California Residents — CCPA
                  / CPRA Rights
                </h3>
                <p>
                  If you are a California resident, you have the following
                  rights under the California Consumer Privacy Act (CCPA), as
                  amended by the California Privacy Rights Act (CPRA):
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                  <li>
                    <strong>Right to Know:</strong> Request the categories and
                    specific pieces of personal information we hold about you,
                    including how we collect, use, and share it
                  </li>
                  <li>
                    <strong>Right to Delete:</strong> Request deletion of your
                    personal information, subject to limited legal exceptions
                  </li>
                  <li>
                    <strong>Right to Correct:</strong> Request correction of
                    inaccurate personal information
                  </li>
                  <li>
                    <strong>Right to Opt Out of Sale or Sharing:</strong> We do
                    not sell or share your data for advertising — this right is
                    honored by default
                  </li>
                  <li>
                    <strong>Right to Limit Sensitive Data Use:</strong> We do
                    not collect sensitive personal information as defined by
                    CPRA
                  </li>
                  <li>
                    <strong>Right to Non-Discrimination:</strong> We will never
                    treat you differently for exercising your privacy rights
                  </li>
                </ul>
                <p className="mt-3 text-sm">
                  To submit a California privacy request, email us at
                  support@instrufix.com. We will verify your identity and
                  respond within 45 days as required by law. You may designate
                  an authorized agent with written permission.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold mb-3 text-lg">
                  8.3 CCPA Categories of Personal Information Collected
                </h3>
                <p>
                  In the past 12 months, we have collected the following
                  categories of personal information as defined under California
                  law:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                  <li>
                    <strong>Identifiers:</strong> name, email address, IP
                    address
                  </li>
                  <li>
                    <strong>Internet or network activity:</strong> pages visited
                    on Instrufix, browser and device type
                  </li>
                  <li>
                    <strong>Geolocation data:</strong> city or region-level
                    location derived from IP address (not precise GPS)
                  </li>
                  <li>
                    <strong>Professional information:</strong> business name,
                    address, and service details (for Repair Shops)
                  </li>
                  <li>
                    <strong>User-generated content:</strong> reviews, photos,
                    and business listing submissions
                  </li>
                  <li>
                    <strong>Communications:</strong> message content exchanged
                    between Customers and Repair Shops via the Platform
                  </li>
                  <li>
                    <strong>Preference data:</strong> businesses saved to a
                    user&apos;s personal list
                  </li>
                  <li>
                    <strong>Verification data:</strong> email verification
                    status and timestamp
                  </li>
                </ul>
                <p className="mt-3 text-sm">
                  We have not sold or shared any of these categories with third
                  parties for commercial or advertising purposes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              9. Children&apos;s Privacy
            </h2>
            <p>
              Instrufix is not directed at children under 13. We do not
              knowingly collect personal information from children under 13. If
              you believe we have inadvertently collected such information,
              please contact support@instrufix.com and we will delete it
              promptly.
            </p>
          </section>

          <section className="bg-slate-900 text-white p-8 rounded-2xl">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-6">
              10. Security
            </h2>
            <p className="text-sm leading-relaxed">
              We take reasonable steps to protect your information, including
              using HTTPS for all connections and limiting internal access to
              personal data. However, no internet transmission is completely
              secure, and we cannot guarantee absolute security.
            </p>
            <p className="text-sm leading-relaxed mt-3">
              In the event of a data breach that affects your personal
              information, we will notify you as required under California law
              (California Civil Code Section 1798.82).
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              11. Links to Third-Party Sites
            </h2>
            <p>
              The Platform may link to Repair Shop websites and other external
              sites. This Privacy Policy does not apply to those sites. Please
              review their own privacy policies before sharing information with
              them.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              12. Changes to This Policy
            </h2>
            <p>
              We will update this Privacy Policy as Instrufix evolves. When we
              make meaningful changes — such as introducing new data practices —
              we will update the Effective Date and notify you directly where
              appropriate.
            </p>
            <p className="mt-3">
              We will never change this Policy in a way that weakens your rights
              without providing advance notice and, where required by law,
              obtaining your consent.
            </p>
          </section>

          {/* --- Footer / Contact --- */}
          <footer className="mt-24 pt-12 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-black mb-2">13. Contact Us</h4>
                  <p className="text-gray-600 mb-4 text-sm max-w-xs">
                    We are a small startup and we genuinely want to hear from
                    you.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:support@instrufix.com"
                      className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity"
                      style={{ color: primaryColor }}
                    >
                      <Mail className="w-5 h-5" /> support@instrufix.com
                    </a>
                    <a
                      href="mailto:contact@instrufix.com"
                      className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity text-gray-700"
                    >
                      <Info className="w-5 h-5" /> contact@instrufix.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-400 font-medium space-y-1">
                <p>Instrufix Inc.</p>
                <p>Founded in the San Francisco Bay Area, CA</p>
                <p>www.instrufix.com</p>
                <p className="pt-4 opacity-60">
                  © 2026 Instrufix. All rights reserved.
                </p>
                <p className="text-xs opacity-50 pt-2">
                  This document does not constitute legal advice. As your
                  platform grows, we recommend a review by a California-licensed
                  attorney.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
