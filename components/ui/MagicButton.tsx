import Link from "next/link";
import React from "react";

const MagicButton = ({
    children,
    link,
}: {
    children: String;
    link: string | URL;
}) => {
    return (
        <Link href={link} className="mx-2 ">
            <button className="p-[3px] relative cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-4 md:px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                    {children}
                </div>
            </button>
        </Link>
    );
};

export default MagicButton;
