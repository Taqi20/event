"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect(() => {
        const token = searchParams?.get("token");

        if (!token) {
            setStatus("error");
            return;
        }

        const verifyEmail = async () => {
            try {
                const res = await fetch("/api/auth/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });

                if (res.ok) {
                    setStatus("success");
                } else {
                    setStatus("error");
                }
            } catch (err) {
                console.error(err);
                setStatus("error");
            }
        };

        verifyEmail();
    }, [searchParams]);

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold">Verifying your email...</p>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Email Verified Successfully 🎉</h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={() => router.push("/dashboard/profile")}
                >
                    Go to Profile
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Verification Failed ❌</h1>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => router.push("/")}
            >
                Go to Home
            </button>
        </div>
    );
}
