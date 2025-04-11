"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

interface RegisterButtonProps {
    eventId: number;
    teamCode?: string;
    onSuccess?: () => void;
}

export default function RegisterButton({ eventId, teamCode, onSuccess }: RegisterButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/event/register", { eventId, teamCode: teamCode || null }, {
                headers: { "Content-Type": "application/json" },
            });
            toast.success(response.data.message || "Registration successful 🎉");
            onSuccess?.();
        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error?.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleRegister} disabled={loading}>
            {loading ? "Registering..." : "Register Now"}
        </Button>
    );
}
