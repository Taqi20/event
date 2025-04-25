export const API_BASE_URL = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `API call failed with status ${response.status}`);
    }
    return response.json();
}

export async function fetchSession() {
    const res = await fetch(`${API_BASE_URL}/auth/session`, { credentials: "include" });
    return handleResponse<any>(res);
}

export async function fetchUserProfile() {
    const res = await fetch(`${API_BASE_URL}/user/profile`, { credentials: "include" });
    return handleResponse<any>(res);
}

export async function updateUserProfile(data: { name?: string; gender?: string; profilePic?: string }) {
    const res = await fetch(`${API_BASE_URL}/user/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include",
    });
    return handleResponse<any>(res);
}

export async function fetchUserRegisteredEvents() {
    const res = await fetch(`${API_BASE_URL}/user/registered-events`, { credentials: "include" });
    return handleResponse<any>(res);
}

export async function fetchUserDashboard() {
    const res = await fetch(`${API_BASE_URL}/user/dashboard`, { credentials: "include" });
    return handleResponse<any>(res);
}

export async function updateUserFeedback(data: { rating: number; comment: string }) {
    const res = await fetch(`${API_BASE_URL}/user/update-feedback`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include",
    });
    return handleResponse<any>(res);
}

export async function updateAcademicInfo(data: { department: string; year: number; division: string; rollNo: string }) {
    const res = await fetch(`${API_BASE_URL}/user/academic-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include",
    });
    return handleResponse<any>(res);
}

export async function fetchEvents() {
    const res = await fetch(`${API_BASE_URL}/event/get-all`);
    return handleResponse<any>(res);
}

export async function fetchUpcomingEvents() {
    const res = await fetch(`${API_BASE_URL}/event/upcoming`, { credentials: "include" });
    return handleResponse<any>(res);
}

export async function fetchEventDetails(eventId: number) {
    const res = await fetch(`${API_BASE_URL}/event/details?eventId=${eventId}`, { credentials: "include" });
    return handleResponse<any>(res);
}

export async function registerForEvent(eventId: number, teamCode?: string) {
    const res = await fetch(`${API_BASE_URL}/event/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, teamCode }),
        credentials: "include",
    });
    return handleResponse<any>(res);
}

export async function unregisterFromEvent(eventId: number) {
    const res = await fetch(`${API_BASE_URL}/event/unregister?eventId=${eventId}`, {
        method: 'DELETE',
        credentials: "include",
    });
    return handleResponse<any>(res);
}

export async function fetchEventStats(eventId: number) {
    const res = await fetch(`${API_BASE_URL}/event/stats?eventId=${eventId}`, { credentials: "include" });
    return handleResponse<any>(res);
}

export async function markAttendance(qrCodeToken: string) {
    const res = await fetch(`${API_BASE_URL}/qrcode/mark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrToken: qrCodeToken }),
        credentials: "include",
    });
    return handleResponse<any>(res);
}

export async function fetchCommittees() {
    const res = await fetch(`${API_BASE_URL}/committee/get-all`);
    return handleResponse<any>(res);
}

export async function fetchCommitteeDetails(committeeNickName: string) {
    const res = await fetch(`${API_BASE_URL}/committee/info?committeeNickName=${committeeNickName}`, { credentials: "include" });
    return handleResponse<any>(res);
}

export async function createCommittee(data: {
    committeeName: string;
    description: string;
    committeeLogo?: string;
    nickName: string;
    socialHandles?: { platform: string; handle: string }[];
    pubs?: { name: string; contact: string }[];
}) {
    const res = await fetch(`${API_BASE_URL}/committee/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include",
    });
    return handleResponse<any>(res);
}

export async function updateCommittee(data: {
    id: number;
    committeeName: string;
    description: string;
    committeeLogo?: string;
    nickName: string;
    socialHandles?: { platform: string; handle: string }[];
    pubs?: { name: string; contact: string }[];
}) {
    const res = await fetch(`${API_BASE_URL}/committee/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include",
    });
    return handleResponse<any>(res);
}

export async function deleteCommittee(id: number) {
    const res = await fetch(`${API_BASE_URL}/committee/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
        credentials: "include",
    });
    return handleResponse<any>(res);
}

export async function fetchCommitteeMembers(committeeId: number) {
    const res = await fetch(`${API_BASE_URL}/committee/members?committeeId=${committeeId}`, { credentials: "include" });
    return handleResponse<any>(res);
}
