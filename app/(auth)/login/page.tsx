"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LucideGoal as Google, Loader2 } from "lucide-react";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (session?.accessToken && !busy) {
            setBusy(true);
            (async () => {
                try {
                    const res = await fetch("/api/user/profile", {
                        headers: { Authorization: `Bearer ${session.accessToken}` },
                    });
                } catch (e) {
                    console.error("profile setup error", e);
                } finally {
                    router.push("/dashboard");
                }
            })();
        }
    }, [session, router, busy]);

    const handleSignIn = async () => {
        setBusy(true);
        await signIn("google", { callbackUrl: "/login" });
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center
      bg-gradient-to-br from-indigo-950 to-purple-950 
      overflow-hidden">
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-indigo-500/30 rounded-full filter blur-3xl"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl"
            >
                <h1 className="text-4xl font-extrabold text-white mb-2 text-center">
                    Welcome
                </h1>
                <p className="text-center text-gray-300 mb-8">
                    One click and you’re in—your account is created automatically.
                </p>

                <button
                    onClick={handleSignIn}
                    disabled={busy || status === "loading"}
                    className="w-full flex items-center justify-center gap-3 py-3 bg-white/90 hover:bg-white rounded-lg text-gray-900 font-medium transition"
                >
                    {busy ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <Google size={20} />
                    )}
                    <span>{busy ? "Please wait…" : "Sign in with Google"}</span>
                </button>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    By signing in, you agree to our{" "}
                    <a className="underline hover:text-white">
                        Terms of Service
                    </a>{" "}
                    &{" "}
                    <a className="underline hover:text-white">
                        Privacy Policy
                    </a>
                    .
                </p>
            </motion.div>
        </div>
    );
}
