"use client"
import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
    return (
        <div className="flex justify-center items-center fixed h-screen w-full top-[50%] left-[50%] -translate-1">
            <Loader2 />
        </div>
    )
}

export default Loader