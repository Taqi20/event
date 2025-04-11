"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/dashboard");
        }
    }, [session, router]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Login to Event.Co</h1>
            <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg"
            >
                Sign in with Google
            </button>
        </div>
    );
}
