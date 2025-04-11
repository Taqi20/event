"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import toast from "react-hot-toast";

export function LoginForm() {
    const handleGoogleSignIn = async () => {
        const result = await signIn("google", { callbackUrl: "/dashboard" });
        if (result) {
            toast.success("Redirecting to Google Sign In...");
        }
    };

    return (
        <div className="font-junge shadow-input mx-auto w-full rounded-none p-4 md:rounded-2xl md:p-8 bg-black">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 tracking-wide">
                Welcome to Events.CO
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                Sign in with your Google account to explore events!
            </p>

            <div className="mt-8">
                <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center w-full h-10 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white transition-all hover:scale-105 shadow-sm duration-100 dark:bg-zinc-800 hover:to-blue-500"
                >
                    <IconBrandGoogle className="mr-2" /> Sign in with Google
                </button>
            </div>

            <p className="text-center text-sm text-neutral-600 dark:text-neutral-300 mt-4">
                Don’t have an account? It will be created automatically with your Google
                account.
            </p>
        </div>
    );
}
