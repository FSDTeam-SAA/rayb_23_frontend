'use client'
import { Globe, MessageCircleCodeIcon, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ContactInfoProps {
  singleBusiness: {
    isClaimed: boolean;
    businessInfo: {
      website: string;
      phone: string;
    };
  };
  handleMessage: () => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ singleBusiness, handleMessage }) => {
  return (
    <div className="border-b border-gray-300 pb-8">
      <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
      <div className="space-y-5">
        {singleBusiness.isClaimed && (
          <button onClick={handleMessage} className="flex items-center gap-2">
            <span className="text-[#139a8e]">
              <MessageCircleCodeIcon />
            </span>
            <span className="text-gray-600 hover:text-[#139a8e]">
              Message Business
            </span>
          </button>
        )}
        <div>
          <Link
            href={singleBusiness.businessInfo.website}
            className="flex items-center gap-2 font-medium"
          >
            <span>
              <Globe className="text-[#139a8e]" />
            </span>
            <span className="text-gray-600 hover:text-[#139a8e]">
              {singleBusiness.businessInfo.website}
            </span>
          </Link>
        </div>

        <div>
          <Link href={`tel:${singleBusiness.businessInfo.phone}`}>
            <div className="flex items-center gap-2 font-medium">
              <span>
                <Phone className="text-[#139a8e]" />
              </span>
              <span className="text-gray-600 hover:text-[#139a8e]">
                {singleBusiness.businessInfo.phone}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;