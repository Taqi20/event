"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../components/ui/Button";

interface RegisterButtonProps {
    eventId: number;
    onSuccess?: (newParticipant: any) => void;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({
    eventId,
    onSuccess,
}) => {
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/event/register", { eventId });
            const newParticipant = response.data;

            toast.success("Registered successfully!");
            onSuccess?.(newParticipant);
        } catch (error: any) {
            console.error("Error registering for event:", error);
            toast.error(error?.response?.data?.message || "Failed to register");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-1/2 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 rounded-r-full"
        >
            {loading ? "Registering..." : "Register"}
        </Button>
    );
};

export default RegisterButton;
