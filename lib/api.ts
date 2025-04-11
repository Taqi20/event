export async function fetchSession() {
    const res = await fetch("/api/auth/session", {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch session");
    return res.json();
}

export async function fetchUserProfile() {
    const res = await fetch("/api/user/profile", {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch user profile");
    return res.json();
}

export async function fetchEvents() {
    const res = await fetch("/api/event/get-all", {
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch events");
    return res.json();
}

export async function fetchCommittees() {
    try {
        const res = await fetch("/api/committee/get-all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch committees: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("fetchCommittees error:", error);
        throw error;
    }
}
