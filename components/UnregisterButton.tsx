"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

interface UnregisterButtonProps {
    eventId: number;
    onSuccess?: () => void;
}

export default function UnregisterButton({
    eventId,
    onSuccess,
}: UnregisterButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleUnregister = async () => {
        setLoading(true);
        try {
            const res = await axios.delete(`/api/event/unregister?eventId=${eventId}`);
            toast.success(res.data.message || "Unregistered successfully");
            onSuccess?.();
        } catch (error: any) {
            console.error("Unregistration error:", error);
            toast.error(error?.response?.data?.message || "Failed to unregister");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleUnregister}
            disabled={loading}
            className="w-1/2 bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 rounded-r-full"
        >
            {loading ? "Unregistering..." : "Unregister"}
        </Button>
    );
}
