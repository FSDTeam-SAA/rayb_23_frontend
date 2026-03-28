/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const signUpFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

// API function to restore flag

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [suspended, setSuspended] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [showRestoredMessage, setShowRestoredMessage] = useState(false);
  const [showRestoreFlagButton, setShowRestoreFlagButton] = useState(false);
  const { data: session, update } = useSession();
  const token = session?.user?.accessToken;
  const queryClient = useQueryClient();

  // Check for justRestored flag from session
  useEffect(() => {
    if (session?.user?.justRestored === true) {
      setShowRestoredMessage(true);
      setShowRestoreFlagButton(false);
    } else if (session?.user?.justRestored === false && session?.user?.id) {
      // If justRestored is false but user is logged in, show the restore button
      setShowRestoreFlagButton(true);
    }
  }, [session]);

  const restoreFlag = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/restore-flag`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to restore flag");
    }

    return response.json();
  };

  // Restore flag mutation
  const restoreFlagMutation = useMutation({
    mutationFn: restoreFlag,
    onSuccess: () => {
      toast.success("Restore flag cleared successfully!");

      update({
        ...session,
        user: {
          ...session?.user,
          justRestored: false,
        },
      });
      // Invalidate and refetch queries if needed
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      setShowRestoreFlagButton(false);
      router.push("/");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to restore flag. Please try again.");
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    const email = values.email.toLowerCase();

    // get stored attempts (object)
    const stored = localStorage.getItem("failedAttempts");
    const attemptsObj = stored ? JSON.parse(stored) : {};

    const attempts = attemptsObj[email] || 0;

    // already locked out for this email
    if (attempts >= 4) {
      toast.error("Too many failed attempts. Please reset your password.");
      router.push("/auth/forgot-password");
      return;
    }

    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password: values.password,
        redirect: false,
      });

      console.log("res: ", res);

      if (res?.ok) {
        attemptsObj[email] = 0;
        localStorage.setItem("failedAttempts", JSON.stringify(attemptsObj));

        // Get the session manually
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();

        console.log("Session data:", sessionData);

        if (sessionData?.user?.justRestored === true) {
          // Show restored message without any redirect
          setShowRestoredMessage(true);
          setIsLoading(false);
          return;
        }

        // Normal login - redirect to home
        window.location.href = "/";
        return;
      }

      if (res?.ok === false) {
        // increment attempts for this email
        attemptsObj[email] = (attemptsObj[email] || 0) + 1;
        localStorage.setItem("failedAttempts", JSON.stringify(attemptsObj));

        if (attemptsObj[email] >= 4) {
          toast.error("Too many failed attempts. Please reset your password.");
          router.push("/auth/forgot-password");
          return;
        }

        if (res.error?.startsWith("VERIFY_EMAIL:")) {
          const token = res.error.split(":")[1];
          router.push(`/auth/verify-email?token=${token}&type=login`);
        } else {
          if (
            res?.error?.includes(
              "Your account is suspended. Please contact support.",
            )
          ) {
            setSuspended(true);
          } else if (
            res?.error?.includes(
              "Your account is deleted. Please contact support.",
            )
          ) {
            setDeleted(true);
          } else {
            toast.error(res.error || "Invalid credentials");
            setSuspended(false);
            setDeleted(false);
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle navigation to home
  const handleGoToHome = () => {
    window.location.href = "/";
  };

  if (suspended) {
    return (
      <section className="lg:py-20 py-10 flex justify-center items-center">
        <div className="max-w-2xl mx-auto w-full px-4">
          <div className="text-center space-y-4 lg:pb-10">
            <h2 className="lg:text-3xl font-bold">Limited Access</h2>
            <p className="text-[#485150] lg:text-base">
              We&apos;ve temporarily limited your access due to a violation of
              our community guidelines. If you believe this was a mistake,
              please contact support for clarification.
            </p>
            <Image
              src="/images/suspended.png"
              alt="suspended"
              width={1000}
              height={1000}
              className="h-[128px] w-[128px] mx-auto"
            />
            <a href="mailto:contact@instrufix.com">
              <Button variant="default" className="w-full text-lg">
                Contact Support
              </Button>
            </a>
          </div>
        </div>
      </section>
    );
  }

  if (showRestoredMessage) {
    return (
      <section className="lg:py-20 py-10 flex justify-center items-center">
        <div className="max-w-2xl mx-auto w-full px-4">
          <div className="text-center space-y-6 lg:pb-10">
            <h2 className="lg:text-3xl font-bold">Access Restored</h2>
            <p className="text-[#485150] lg:text-base">
              We&apos;ve reviewed your profile and restored your access. Thanks
              for working with us to keep the community respectful and helpful.
            </p>
            <div>
              <Image
                src={"/right-sign.png"}
                alt="img.png"
                width={1000}
                height={1000}
                className="w-40 h-40 mx-auto"
              />
            </div>
            <Button
              variant="default"
              className="w-full text-lg"
              onClick={handleGoToHome}
            >
              Go to Home
            </Button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-600 w-5 h-5" />
                <p className="text-sm text-blue-800">
                  Your account has been restored. Clear the restore flag to
                  continue.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => restoreFlagMutation.mutate()}
                disabled={restoreFlagMutation.isPending}
                className="bg-white hover:bg-blue-50"
              >
                {restoreFlagMutation.isPending ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Clearing...
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                    Clear Restore Flag
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="lg:py-20 py-10 flex justify-center items-center">
      <div className="max-w-3xl mx-auto w-full px-4">
        <div className="text-center space-y-4 lg:pb-10">
          <h2 className="lg:text-3xl font-bold">Log In</h2>
          <p className="text-[#485150] lg:text-base">
            Please login to enjoy all features of instrufix.
          </p>
        </div>

        <Form {...signUpForm}>
          <form
            onSubmit={signUpForm.handleSubmit(onSubmit)}
            className="lg:space-y-6 space-y-3"
          >
            {/* Email */}
            <FormField
              control={signUpForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                      />
                      <Input
                        className="pl-10 h-14 bg-[#F7F8F8] border border-[#E7E9E9]"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={signUpForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                      />
                      <Input
                        className="pl-10 h-14 bg-[#F7F8F8] border border-[#E7E9E9] pr-10"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              <Link href="/auth/signup" className="text-sm text-[#485150]">
                Don&apos;t have an account?{" "}
                <span className="text-blue-400 underline">Sign Up</span>
              </Link>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-400 underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Log In
            </Button>
          </form>
        </Form>
        {deleted && (
          <div className="w-full bg-[#E240401F] rounded-md p-4 mt-12 text-center">
            <p className="text-[#E24040]">
              Your profile has been permanently deleted by our admin team. If
              you believe this action was taken in error or need more
              information, please reach out to{" "}
              <a href="mailto:contact@instrufix.com" className="underline">
                support
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
