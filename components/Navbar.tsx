"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();

    // Conditionally render auth button based on session status
    const authButton = session ? (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-white/80 hover:text-white transition duration-300"
        >
            Logout
        </button>
    ) : (
        <Link
            href="/login"
            className="text-white/80 hover:text-white transition duration-300"
        >
            Login
        </Link>
    );

    return (
        <nav className="bg-black/30 backdrop-blur-lg shadow-lg shadow-purple-600/50 fixed top-0 w-full z-50 text-blue-100 border-b border-white/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 ml-8 md:ml-0">
                        <Link
                            href="/"
                            className="text-3xl font-bold text-white font-jura tracking-wide transition-transform hover:scale-105"
                        >
                            Event.Co
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Auth Button for mobile (visible on all screen sizes) */}
                        <div className="block md:hidden">{authButton}</div>
                        {/* Auth Button for desktop */}
                        <div className="hidden md:flex items-center space-x-4">{authButton}</div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
