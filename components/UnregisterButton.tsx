"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

interface UnregisterButtonProps {
    eventId: number;
    onSuccess?: () => void;
}

export default function UnregisterButton({ eventId, onSuccess }: UnregisterButtonProps) {
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
        <Button onClick={handleUnregister} disabled={loading} variant="destructive">
            {loading ? "Unregistering..." : "Unregister"}
        </Button>
    );
}
