"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Label } from "@radix-ui/react-label";

export function SignupForm() {
    const handleGoogleSignUp = async () => {
        const result = await signIn("google", { callbackUrl: "/" });
        if (result) {
            console.log("Redirecting to Google Sign Up...");
        }
    };

    return (
        <div className="font-junge shadow-input mx-auto w-full rounded-none p-4 md:rounded-2xl md:p-8 bg-black">
            <h2 className="text-xl font-bold text-neutral-200 tracking-wide">
                Welcome to Events.CO
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-300">
                Sign up using your Google account to get started.
            </p>

            <div className="mt-8">
                {/* Google Sign Up Button */}
                <button
                    onClick={handleGoogleSignUp}
                    className="flex items-center justify-center w-full h-10 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white transition-all hover:scale-105 shadow-sm duration-100 dark:bg-zinc-800 hover:to-blue-500"
                >
                    <IconBrandGoogle className="mr-2" /> Sign up with Google
                </button>
            </div>

            <p className="text-center text-sm text-neutral-300 mt-4">
                Your account will be created using your Google credentials.
            </p>
        </div>
    );
}
