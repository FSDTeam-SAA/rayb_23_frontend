/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface LoginModalProps {
  isLogoutBusinessSuccessModalOpen: boolean;
  setIsLogoutBusinessSuccessModalOpen: (value: boolean) => void;
  handelOkay: () => void;
  setLogOutEmail: (value: string) => void;
  handleLogOutSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  logOutEmail: string;
  isPending: boolean;
}

const LogOutBusinessSuccessModal: React.FC<LoginModalProps> = ({
  isLogoutBusinessSuccessModalOpen,
  setIsLogoutBusinessSuccessModalOpen,
  handelOkay,
  handleLogOutSubmit,
  setLogOutEmail,
  logOutEmail,
  isPending,
}) => {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      if (!logOutEmail.trim()) {
        setError("Email is required.");
      } else if (!validateEmail(logOutEmail)) {
        setError("Please enter a valid email address.");
      } else {
        setError("");
      }
    }
  }, [logOutEmail, touched]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLogOutEmail(value);
    if (!touched) {
      setTouched(true);
    }
  };

  const handleInputBlur = () => {
    setTouched(true);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (isPending) return;
    
    setTouched(true);
    
    if (!logOutEmail.trim()) {
      setError("Email is required.");
      return;
    }
    
    if (!validateEmail(logOutEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    handleLogOutSubmit(e as any);
    setIsLogoutBusinessSuccessModalOpen(false);
  };

  const handleOkay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); 
    
    if (isPending) return;
    
    setTouched(true);
    
    if (!logOutEmail.trim()) {
      setError("Email is required.");
      return;
    }
    
    if (!validateEmail(logOutEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    handleLogOutSubmit(e as any);
    handelOkay();
  };

  if (!isLogoutBusinessSuccessModalOpen) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => {
            if (isPending) return;
            
            setTouched(true);
            if (!logOutEmail.trim() || !validateEmail(logOutEmail)) {
              return;
            }
            setIsLogoutBusinessSuccessModalOpen(false);
          }}
        ></div>

        {/* Modal Content */}
        <div 
          className="relative bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6 z-10 animate-fadeIn text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold text-center mb-1">Submitted</h2>

          <p className="text-gray-500 mb-2">
            Thanks! Your submission is under review. You&apos;ll be notified
            when it&apos;s approved.
          </p>

          <div>
            <Image
              src={"/images/submitted.svg"}
              alt="submitted.png"
              width={1000}
              height={1000}
              className="h-40 w-40 mx-auto"
            />
          </div>

          <div className="text-start">
            <h1 className="mb-2">
              <span className="text-gray-600 font-medium">Email</span>{" "}
            </h1>

            <div className="relative">
              <Input
                type="email"
                placeholder="Enter Your Email"
                className={`focus-visible:ring-0 pl-9 ${error ? "border-red-500" : ""}`}
                value={logOutEmail}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                disabled={isPending} 
              />

              <Mail className="h-5 w-5 absolute top-1/4 left-2 text-gray-700" />
            </div>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          </div>

          <div className="flex items-center gap-5 mt-5">
            <button
              disabled={isPending}
              onClick={handleCancel}
              className="border border-primary text-primary py-2 rounded-lg w-1/2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Canceling..." : "Cancel"}
            </button>

            <button
              onClick={handleOkay}
              disabled={isPending || !!error}
              className="bg-primary text-white py-2 rounded-lg w-1/2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Processing..." : "Okay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOutBusinessSuccessModal;