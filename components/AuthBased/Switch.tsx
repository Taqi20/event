"use client";

import React from "react";

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export function Switch({ checked, onChange }: SwitchProps) {
    return (
        <div
            className={`relative w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all 
        ${checked ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-300 dark:bg-gray-700"}`}
            onClick={() => onChange(!checked)}
        >
            {/* Switch Handle */}
            <div
                className={`w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transform transition-all 
          ${checked ? "translate-x-7" : "translate-x-0"}`}
            />
        </div>
    );
}
