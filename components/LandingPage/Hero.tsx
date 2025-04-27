"use client";
import React from "react";

import Link from "next/link";

import { motion } from "framer-motion";
import { BackgroundLines } from "../ui/BackGroundLines";

const Hero = () => {
    return (
        <div className="pt-32 md:pt-2 pb-20 px-4 sm:px-6 h-auto md:min-h-[70vh] flex flex-col justify-start md:justify-center items-center lg:px-8 max-w-7xl mx-auto relative z-10 mt-10">
            {/* Glowing Background Circle */}


            {/* Floating Background Elements */}
            <motion.div
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute w-48 h-48 bg-blue-400/50 rounded-full -top-10 left-5"
            />

            <motion.div
                animate={{ y: [0, -40, 0], x: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute w-64 h-64 bg-blue-500/50 rounded-full top-80 left-5"
            />

            <motion.div
                animate={{ y: [0, -15, 0], x: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute w-52 h-52 bg-blue-600/50 rounded-full top-50 left-10"
            />


            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute rounded-full w-80 h-80 bg-indigo-700/40 bottom-10 right-10"
            ></motion.div>


            <div className="text-center flex flex-col justify-start md:justify-center items-center gap-8">
                <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 z-10">

                    {/* Animated Image (Hidden on Small Screens) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="hidden md:block z-0 absolute top-1/2 -translate-y-1/3 -right-22  lg:-right-1/4"
                    >
                        <img
                            src="/virtual-augmented-reality-isometric-illustration.png"
                            alt="Event Management"
                            className="mix-blend-color-burn md:w-[300px] lg:w-[500px] z-0"
                        />
                    </motion.div>

                    {/* Animated Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl lg:text-7xl font-sans py-2 -mt-4 md:my-8 md:py-10 relative z-20 font-bold tracking-tight"
                    >
                        Discover and Manage <span className="text-indigo-200">Events</span>{" "}
                        Like Never Before
                    </motion.h2>

                    {/* Animated Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center z-10"
                    >
                        Your all-in-one platform for discovering campus events, organizing
                        gatherings, and connecting with your community.
                    </motion.p>

                    {/* Animated Buttons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        className="mt-10 flex justify-center gap-2 md:gap-4 flex-wrap z-40"
                    >
                        <Link href={"/dashboard/events"} className="cursor-pointer">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 md:px-8 py-2 md:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md text-white font-medium"
                            >
                                Browse Events
                            </motion.button>
                        </Link>
                    </motion.div>

                </BackgroundLines>
            </div>
        </div>
    );
};

export default Hero;
