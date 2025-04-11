"use client"
import React from "react";

import { testimonials } from "@/lib/constants";
import { motion } from "framer-motion"
import { InfiniteMovingCards } from "../ui/InfiniteCard";

const Testimonials = () => {
    return (
        <div className="max-w-7xl mx-auto  relative" id="testimonials">


            <motion.div
                animate={{ y: [0, -15, 0], x: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute w-18 h-18 bg-blue-600/50 rounded-full top-15 right-5"
            />
            <h2 className="text-3xl md:text-4xl  text-indigo-300 text-center font-jura">Our Testimonials</h2>
            <div className="h-[30rem] rounded-md flex flex-col antialiased bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
            </div>
        </div>
    );
};

export default Testimonials;
