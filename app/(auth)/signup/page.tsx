import React from "react";
import { SignupForm } from "@/components/AuthBased/SignupForm";

const SignupPage = () => {
    return (
        <div className="flex min-h-screen font-jura">
            <div className="w-full md:w-1/2 lg:w-1/3 flex items-center justify-center p-3 md:p-8">
                <div className="w-full min-w-[380px] max-w-[480px] bg-black/70 backdrop-blur-lg p-8 rounded-xl shadow-xl">
                    <SignupForm />
                </div>
            </div>
            <div className="hidden md:flex flex-1 flex-col justify-center p-12 relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-black rounded-l-[20%]">
            </div>
        </div>
    );
};

export default SignupPage;
