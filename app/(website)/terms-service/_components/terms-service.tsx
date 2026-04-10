import React from "react";
import { Mail, AlertTriangle, Shield, Scale } from "lucide-react";

const TermsServices = () => {
  const primaryColor = "#139a8e";

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] py-20 px-6 font-sans antialiased">
      <div className="max-w-3xl mx-auto">
        {/* --- Header Section --- */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-16 text-black">
            Terms & Conditions
          </h1>
        </header>

        {/* --- Intro / Plain English Summary --- */}
        <div className="space-y-8 text-[17.5px] leading-relaxed text-gray-800">
          <p className="font-semibold text-gray-900 tracking-wide uppercase text-sm">
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
            <p className="text-[#0d6b63] font-medium italic leading-relaxed">
              &quot;Instrufix is a free directory to help you find instrument
              repair shops. We do not process payments, handle transactions, or
              touch your instrument. We do not sell your data. We are a small
              startup and some things will evolve — we will always be upfront
              about changes.&quot;
            </p>
          </div>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              1. What Instrufix Is
            </h2>
            <p>
              Instrufix is a free online directory that connects musicians with
              instrument repair shops and technicians across the United States.
              Our current listings are focused on the San Francisco Bay Area,
              where we started, but the Platform is open to users and businesses
              nationwide. Our goal is simple: make it easier for musicians to
              find skilled repair professionals near them.
            </p>
            <p className="mt-4">
              That is the full scope of our service right now. We are an
              early-stage startup and proud of keeping things focused.
            </p>
          </section>

          <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-500" /> 2. What
              Instrufix Is Not
            </h2>
            <p className="mb-4 font-medium">
              We want to be completely transparent about what we do not do:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-[15px]">
              <li className="flex gap-2">
                <span>•</span> We do not process payments between you and Repair
                Shops
              </li>
              <li className="flex gap-2">
                <span>•</span> We do not facilitate bookings, appointments, or
                scheduling
              </li>
              <li className="flex gap-2">
                <span>•</span> We do not handle, receive, or ship instruments
              </li>
              <li className="flex gap-2">
                <span>•</span> We do not provide repair quotes or guarantee any
                pricing
              </li>
              <li className="flex gap-2">
                <span>•</span> We do not fulfill any orders or services of any
                kind
              </li>
              <li className="flex gap-2">
                <span>•</span> We do not make money from this platform at this
                time
              </li>
              <li className="flex gap-2">
                <span>•</span> We do not sell your personal data — to anyone,
                ever
              </li>
            </ul>
            <p className="mt-6 text-[16px] text-gray-600 italic">
              We do provide an in-platform messaging feature that allows
              Customers to send messages directly to Repair Shops that have
              created a verified business account. This is a communication tool
              only — it does not constitute a booking, a contract, or a
              guarantee of service. Any commitments made through messaging are
              between you and the Repair Shop.
            </p>
            <p className="mt-4 text-[16px] text-gray-600">
              Every interaction beyond the message itself — visiting, dropping
              off your instrument, agreeing on a price, paying — happens
              entirely between you and that business. Instrufix is not a party
              to those interactions and accepts no responsibility for them.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              3. Accepting These Terms
            </h2>
            <p>
              By visiting or using the Instrufix platform (the
              &quot;Platform&quot;), you agree to these Terms and Conditions
              (&quot;Terms&quot;). If you do not agree, please do not use the
              Platform.
            </p>
            <p className="mt-4">
              We may update these Terms as Instrufix grows. When we do, we will
              update the Effective Date at the top and, for material changes,
              give you notice — such as an email or a notice on the site.
              Continuing to use the Platform after changes take effect means you
              accept them.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              4. Who Can Use Instrufix
            </h2>
            <p>
              You must be at least 13 years old to use the Platform. If you are
              between 13 and 17, you should have a parent or guardian review
              these Terms with you.
            </p>
            <p className="mt-4">
              You agree to use the Platform only for lawful purposes and in a
              way that does not infringe on the rights of others.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              5. Accounts
            </h2>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">
                5.1 No Account Required to Browse
              </h3>
              <p>
                Anyone can browse the Instrufix directory without registering.
                No account is needed to search for or view Repair Shop listings.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">
                5.2 Customer Accounts
              </h3>
              <p>
                Customers may create a free account on Instrufix. Registered
                Customers have access to the following features:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Personal profile</li>
                <li>Writing and submitting reviews for Repair Shops</li>
                <li>Uploading photos related to their repair experience</li>
                <li>Saving businesses to a personal list</li>
                <li>Sharing business listing links</li>
                <li>
                  Messaging Repair Shops that have a verified business account
                </li>
                <li>
                  Submitting new business listings for shops not yet on the
                  Platform
                </li>
              </ul>
              <p className="mt-3 text-sm bg-gray-50 p-4 rounded border">
                By creating an account, you agree to provide accurate, current,
                and complete information and to keep it up to date. You are
                responsible for maintaining the confidentiality of your
                credentials and for all activity that occurs under your account.
                If you suspect unauthorized access, notify us immediately at
                contact@instrufix.com.
              </p>
            </div>

            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
              <h3 className="text-xl font-bold text-black mb-2">
                5.3 Customer-Submitted Business Listings
              </h3>
              <p>
                Customers may submit a business listing for a Repair Shop they
                cannot find on the Platform. This is a community contribution
                feature. Submitting a listing does not make the Customer the
                owner or manager of that listing, does not grant any
                administrative rights over the listing, and does not create any
                affiliation between the Customer and the business.
              </p>
              <p className="mt-3">
                Customer-submitted listings are unmanaged until a representative
                of the business creates or claims the listing through a verified
                business account. Instrufix may edit, merge, or remove
                customer-submitted listings at any time.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">
                5.4 Business Accounts
              </h3>
              <p>
                Repair Shops and instrument service businesses may create a free
                business account on Instrufix. Business accounts enable the
                following:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>
                  Creating and publishing a new business listing from scratch
                </li>
                <li>
                  Claiming and taking ownership of an existing listing — whether
                  submitted by Instrufix or by a Customer
                </li>
                <li>
                  Managing all profile information, including business name,
                  address, contact details, services offered, photos, and
                  operating hours
                </li>
                <li>Receiving and responding to messages from Customers</li>
              </ul>
              <p className="mt-3 text-sm bg-gray-50 p-4 rounded border">
                Creating a business account requires email verification. By
                registering, the person completing registration confirms that:
                (a) they are the owner of the business or are authorized to act
                on its behalf; (b) all information provided is accurate; and (c)
                the listing will be kept current. Misrepresenting authority to
                manage a business listing is a violation of these Terms.
              </p>
              <p className="mt-3">
                Only one verified business account may manage any given listing.
                If a dispute arises over ownership of a listing, Instrufix will
                investigate and may request supporting documentation. Our
                determination is final.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">
                5.5 Email Verification
              </h3>
              <p>
                All accounts — Customer and business — require email
                verification before activation. When you register, we will send
                a verification link or code to the email address you provide.
                You must have legitimate access to that address. Using someone
                else&apos;s email or a fake address to circumvent verification
                is a violation of these Terms and grounds for immediate account
                removal.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">
                5.6 Account Suspension and Termination by Instrufix
              </h3>
              <p>
                The Instrufix platform administrator reserves the right to
                suspend, restrict, or permanently delete any account — Customer
                or business — at any time and without prior notice, in cases
                including but not limited to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Violation of these Terms or any Instrufix policy</li>
                <li>
                  Submission of false, misleading, or fraudulent information
                </li>
                <li>
                  Abusive, harassing, or harmful conduct toward other users or
                  businesses
                </li>
                <li>
                  Misuse of the messaging, review, photo, or listing features
                </li>
                <li>
                  Any behavior that Instrufix determines to be harmful to the
                  Platform, its users, or listed businesses
                </li>
              </ul>
              <p className="mt-3">
                Suspended or terminated users may contact us at
                contact@instrufix.com to appeal. Instrufix will review appeals
                in good faith but is not obligated to reinstate any account.
                Termination does not affect any obligations you incurred prior
                to termination.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              6. Directory Accuracy
            </h2>
            <p>
              We work to keep listings accurate, but we are a small team and
              cannot guarantee that every listing is complete, current, or
              error-free. Shops may have changed their hours, location, or
              services since a listing was last updated.
            </p>
            <p className="mt-4">
              Please verify details directly with a Repair Shop before making a
              trip or sending your instrument. Instrufix is not responsible for
              inconvenience, wasted time, or any loss resulting from inaccurate
              listing information.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              7. Customer Features and User Content
            </h2>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">
                7.1 What Customers Can Do
              </h3>
              <p>
                Registered Customers may use the following features on the
                Platform. Each comes with the responsibilities described below.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">7.2 Reviews</h3>
              <p>
                Customers may write and submit reviews for Repair Shops they
                have personally visited or used. Reviews must reflect a genuine,
                firsthand experience. Reviews must not be written in exchange
                for payment, discounts, gifts, or any other incentive, and must
                not be submitted by the business being reviewed, its employees,
                or its competitors.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">7.3 Photos</h3>
              <p>
                Customers may upload photos related to their experience with a
                Repair Shop — for example, photos of their instrument before or
                after repair. By uploading a photo, you confirm that you own it
                or have the right to share it, and that it does not depict
                anything illegal, explicit, or harmful. Do not upload photos
                that include identifiable private individuals without their
                consent.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">
                7.4 Saving Businesses
              </h3>
              <p>
                Customers may save Repair Shop listings to a personal saved list
                within their account. This feature is for personal reference
                only and does not create any relationship between the Customer
                and the business.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">
                7.5 Sharing Business Links
              </h3>
              <p>
                Customers may share links to Repair Shop listings via the
                Platform&apos;s share feature. Sharing a listing does not imply
                endorsement by Instrufix and must not be used for commercial
                promotion or spam.
              </p>
            </div>

            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
              <h3 className="text-xl font-bold text-black mb-2">
                7.6 Submitting New Business Listings
              </h3>
              <p>
                If a Customer cannot find a Repair Shop on Instrufix, they may
                submit it as a new listing. This helps grow the directory for
                the community. Customers who submit a listing acknowledge that:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>
                  They do not become the owner, manager, or representative of
                  the submitted listing
                </li>
                <li>
                  They have no administrative rights over the listing once
                  submitted
                </li>
                <li>
                  The listing may be edited, merged, or removed by Instrufix at
                  any time
                </li>
                <li>
                  A business representative may later claim, update, or take
                  over the listing through a verified business account
                </li>
              </ul>
              <p className="mt-3">
                Submitted listings must be for real, legitimate instrument
                repair businesses. Submitting false, duplicate, or malicious
                listings is a violation of these Terms.
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg text-sm text-red-900 border-l-4 border-red-200 mt-5 mb-5">
              <h3 className="text-lg font-bold text-red-800 mb-2">
                7.7 What Is Not Allowed in Any User Content
              </h3>
              <p>
                Across all features — reviews, photos, listing submissions,
                messages, and profile content — you must not submit anything
                that:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Is false, fabricated, or misleading</li>
                <li>
                  Is defamatory, harassing, threatening, or abusive toward any
                  person or business
                </li>
                <li>
                  Includes private information about others without their
                  consent
                </li>
                <li>
                  Infringes any copyright, trademark, or intellectual property
                  right
                </li>
                <li>Contains explicit, illegal, or harmful material</li>
                <li>
                  Was submitted in exchange for payment or any other incentive
                </li>
                <li>Violates any applicable law</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">
                7.8 License to Your Content
              </h3>
              <p>
                By submitting any content to the Platform — including reviews,
                photos, listing information, or profile content — you grant
                Instrufix a non-exclusive, royalty-free, worldwide license to
                display, reproduce, and use that content to operate and promote
                the Platform. You retain ownership of your content.
              </p>
            </div>

            <div className="mt-5">
              <h3 className="text-xl font-bold text-black mb-2">
                7.9 Content Removal and Moderation
              </h3>
              <p>
                Instrufix and its administrators may remove, edit, or hide any
                user-submitted content at any time, with or without notice, if
                it violates these Terms or is otherwise deemed inappropriate. We
                are not obligated to proactively monitor all content but will
                act on reports of policy violations. To report content, contact
                us at contact@instrufix.com.
              </p>
            </div>
          </section>

          <section className="border-2 border-gray-100 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6" style={{ color: primaryColor }} /> 8.
              Messaging Feature
            </h2>
            <p className="mb-4">
              Customers may send messages to Repair Shops that have claimed
              their listing on Instrufix. This section governs use of that
              feature.
            </p>

            <div className="space-y-4 text-sm">
              <p>
                <strong>8.1 How It Works:</strong> When a Repair Shop creates a
                business account, they gain access to receive messages from
                Customers through the Platform. Customers can initiate a
                conversation to ask questions, describe their instrument, or
                inquire about services. Messaging is available only to Repair
                Shops with an active, verified business account — shops without
                an account cannot receive messages.
              </p>

              <p>
                <strong>8.2 Instrufix Is a Conduit, Not a Party:</strong>{" "}
                Instrufix provides the messaging infrastructure but is not a
                party to any conversation between a Customer and a Repair Shop.
                We do not monitor messages in real time, do not mediate disputes
                arising from messaging, and are not responsible for commitments,
                representations, or agreements made through the messaging
                feature. Any quote, appointment, or agreement reached through
                messaging is solely between the Customer and the Repair Shop.
                Instrufix has no obligation to enforce or honor such agreements.
              </p>

              <p>
                <strong>8.3 Acceptable Use of Messaging:</strong> The messaging
                feature may only be used for legitimate inquiries related to
                instrument repair services. You agree not to use messaging to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Send spam, unsolicited advertisements, or promotional material
                </li>
                <li>Harass, threaten, or intimidate the other party</li>
                <li>
                  Share false or misleading information about yourself or your
                  instrument
                </li>
                <li>
                  Solicit personal contact information for purposes unrelated to
                  the repair inquiry
                </li>
                <li>Conduct any activity that violates applicable law</li>
                <li>
                  Attempt to move the conversation off-platform in order to
                  circumvent any future Platform features or policies
                </li>
              </ul>

              <p>
                <strong>8.4 No Guarantee of Response:</strong> Instrufix does
                not guarantee that a Repair Shop will respond to any message, or
                within any particular timeframe. Response rates and timeliness
                are entirely at the Repair Shop&apos;s discretion.
              </p>

              <p>
                <strong>8.5 Message Storage and Privacy:</strong> Messages sent
                through the Platform are stored on our servers in order to
                deliver the feature and maintain a conversation history for both
                parties. Please refer to our Privacy Policy for full details on
                how message content is handled, stored, and protected. Do not
                send sensitive personal information — such as financial details,
                government ID numbers, or medical information — through the
                messaging feature.
              </p>

              <p>
                <strong>8.6 Reporting Abuse:</strong> If you receive a message
                that violates these Terms — including harassment, spam, or
                inappropriate content — please report it to us at
                contact@instrufix.com. We will review reported messages and may
                remove access to the messaging feature for users who violate
                these rules.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              9. Prohibited Conduct
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 columns-1 md:columns-2">
              <li>Use the Platform for any unlawful purpose</li>
              <li>
                Submit false or misleading information about yourself, others,
                or any business
              </li>
              <li>
                Scrape, copy, or harvest Platform content using automated tools
              </li>
              <li>
                Attempt to access any part of the Platform you are not
                authorized to use
              </li>
              <li>
                Interfere with the Platform&apos;s operation or infrastructure
              </li>
              <li>Impersonate any person, business, or entity</li>
              <li>
                Post spam, unsolicited advertisements, or content unrelated to
                instrument repair
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              10. Third-Party Links
            </h2>
            <p>
              The Platform may include links to Repair Shop websites and other
              external sites. We do not control those sites and are not
              responsible for their content or practices. A link does not imply
              endorsement.
            </p>
          </section>

          <section className="bg-slate-900 text-white p-10 rounded-2xl my-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="text-emerald-400" /> 11. Disclaimer of
              Warranties
            </h2>
            <p className="text-sm font-mono leading-relaxed uppercase opacity-80 mb-8 border-b border-slate-700 pb-8">
              THE PLATFORM IS PROVIDED &quot;AS IS&quot; AND &quot;AS
              AVAILABLE.&quot; AS AN EARLY-STAGE STARTUP, INSTRUFIX MAKES NO
              WARRANTIES — EXPRESS OR IMPLIED — REGARDING THE ACCURACY,
              COMPLETENESS, RELIABILITY, OR AVAILABILITY OF THE PLATFORM OR ANY
              LISTED REPAIR SHOP. WE DO NOT ENDORSE ANY REPAIR SHOP OR GUARANTEE
              THE QUALITY OF THEIR SERVICES.
            </p>
            <p className="text-sm font-mono leading-relaxed uppercase opacity-80">
              USE OF THE PLATFORM AND ENGAGEMENT WITH ANY REPAIR SHOP IS
              ENTIRELY AT YOUR OWN RISK.
            </p>
          </section>

          <section className="bg-slate-900 text-white p-10 rounded-2xl my-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Scale className="text-emerald-400" /> 12. Limitation of Liability
            </h2>
            <p className="text-sm font-mono leading-relaxed uppercase opacity-80 mb-6">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, INSTRUFIX AND
              ITS FOUNDERS, TEAM MEMBERS, AND AFFILIATES SHALL NOT BE LIABLE FOR
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES ARISING FROM YOUR USE OF THE PLATFORM OR YOUR ENGAGEMENT
              WITH ANY LISTED REPAIR SHOP — INCLUDING DAMAGE TO OR LOSS OF YOUR
              INSTRUMENT.
            </p>
            <p className="text-sm font-mono leading-relaxed uppercase opacity-80">
              BECAUSE INSTRUFIX DOES NOT PROCESS PAYMENTS OR PROVIDE ANY
              SERVICES ITSELF, OUR TOTAL LIABILITY FOR ANY CLAIM IS LIMITED TO
              $100 USD.
            </p>
            <p className="text-xs text-gray-400 mt-4 italic normal-case">
              Some states do not allow certain liability exclusions, so portions
              of the above may not apply to you.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              13. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless Instrufix and
              its team from any claims, losses, or expenses (including
              reasonable attorneys&apos; fees) arising from your use of the
              Platform, your violation of these Terms, or any dispute between
              you and a Repair Shop.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              14. Changes to the Platform
            </h2>
            <p>
              We are a startup — the Platform will change and grow over time. We
              reserve the right to modify, pause, or discontinue features at any
              time. We will do our best to provide advance notice for
              significant changes.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              15. Governing Law and Disputes
            </h2>
            <p>
              These Terms are governed by the laws of the State of California,
              without regard to its conflict of law principles. Any disputes
              shall be brought in the state or federal courts in San Mateo
              County, California.
            </p>
            <p className="mt-4">
              Before any formal action, please reach out to us at
              contact@instrufix.com. We are a small team and we want to resolve
              issues directly and fairly.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mb-6 mt-12">
              16. General Provisions
            </h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the
              entire agreement between you and Instrufix regarding the Platform.
              If any provision is found to be unenforceable, the remainder of
              these Terms stays in effect. Our failure to enforce any right is
              not a waiver of that right.
            </p>
            <p className="mt-4">Questions? Email us: contact@instrufix.com</p>
          </section>

          {/* --- Footer / Contact --- */}
          <footer className="mt-24 pt-12 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-black mb-2">Questions?</h4>
                  <p className="text-gray-600 mb-4 text-sm max-w-xs">
                    We are a small team and we want to resolve issues directly
                    and fairly.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:contact@instrufix.com"
                      className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity"
                      style={{ color: primaryColor }}
                    >
                      <Mail className="w-5 h-5" /> contact@instrufix.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-400 font-medium space-y-1">
                <p>Instrufix Inc.</p>
                <p>San Mateo County, California</p>
                <p>www.instrufix.com</p>
                <p className="pt-4 opacity-60 italic text-xs">
                  Instrufix | Page 9 of 17
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TermsServices;
