"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import MagicButton from "./ui/MagicButton";
import UserInfo from "./Others/UserInfo";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                        {/* Avatar Section (only show when logged in) */}
                        {session && (
                            <div
                                className="p-4 border-t border-gray-700 flex items-center gap-3 cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <img
                                    src={"/avatar.png"}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full border-2 border-gray-500"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Modal for user profile */}
            {isModalOpen && <UserInfo setIsModalOpen={setIsModalOpen} />}
        </nav>
    );
};

export default Navbar;
