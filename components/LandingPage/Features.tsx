"use client";

import React from "react";
import { HoverEffect } from "../ui/CardHover";
import { features } from "@/lib/constants";
import { motion } from "framer-motion";

const Features = () => {
    return (
        <motion.div
            id="features"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="w-full  min-h-[80vh] flex justify-center items-center font-jura relative"
        >
            <motion.div
                animate={{ y: [0, -40, 0], x: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute w-64 h-64 bg-blue-500/50 rounded-full top-80 left-5"
            />

            <motion.div
                animate={{ y: [0, -15, 0], x: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute w-52 h-52 bg-blue-600/50 rounded-full top-50 right-10"
            />

            <div className="max-w-7xl px-5 flex justify-center items-center flex-col">
                <h2 className="text-3xl md:text-4xl  text-indigo-300">Featured Events</h2>

                {/* Animated Hover Cards */}
                <HoverEffect items={features} />
            </div>
        </motion.div>
    );
};

export default Features;
