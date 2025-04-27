import { CalendarPlus, Users, Bell, Calendar } from "lucide-react";

export const navItems = [
    { name: "Home", link: "#home", icon: "/home.png" },
    { name: "Works", link: "#service", icon: "/service.png" },
    { name: "Testimonials", link: "#testimonials", icon: "/testimonial.png" },
    { name: "About", link: "/about", icon: "/about.png" },
    { name: "Contact", link: "/contact", icon: "/contact.png" },
];

export const features = [
    {
        title: "Event Creation",
        description: "Easily create new events with details like name, date, location, and description.",
        link: "/event-creation",
        icon: CalendarPlus,  // Store the component reference
    },
    {
        title: "Attendee Registration",
        description: "Allow attendees to register for events by providing their name, email, and other details.",
        link: "/attendee-registration",
        icon: Users,  // Store the component reference
    },
    {
        title: "Event Reminder Notification",
        description: "Send automated reminders to attendees about upcoming events.",
        link: "/event-reminders",
        icon: Bell,  // Store the component reference
    }
];

export const testimonials = [
    {
        quote:
            "The event management platform made it so easy to find and register for college events. The attendance tracking feature is a lifesaver for keeping track of my participation!",
        name: "Aarav Mehta",
        title: "Computer Engineering Student",
        image: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    {
        quote:
            "I love how smooth the committee enrollment process is. It’s helped me stay involved in college activities without any hassle!",
        name: "Sophia Patel",
        title: "Mechanical Engineering Student",
        image: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
        quote:
            "This platform is a game-changer! I can browse events, track attendance, and even get event reminders. It’s so convenient for students like me.",
        name: "Ryan Sharma",
        title: "Electronics & Communication Student",
        image: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    {
        quote:
            "Managing my event participation has never been easier. I can now focus on learning and networking without worrying about missing an event!",
        name: "Ishika Rao",
        title: "Information Technology Student",
        image: "https://randomuser.me/api/portraits/women/24.jpg",
    },
    {
        quote:
            "Being able to explore inter-college events has helped me connect with students from different colleges. This platform is a must-have for all students!",
        name: "Karan Deshmukh",
        title: "Civil Engineering Student",
        image: "https://randomuser.me/api/portraits/men/25.jpg",
    },
];


import { PlusSquare, Compass, BarChart, Bookmark, UserCog } from "lucide-react";

export const sidebarMenu = (role: string) => {
    if (role === "admin") {
        return [
            {
                title: "Communities",
                path: "/dashboard/communities",
                icon: Users,
                subMenu: [
                    { title: "Manage Users", path: "/dashboard/communities/manage-users" },
                    { title: "Manage Events", path: "/dashboard/communities/manage-events" },
                ],
            },
            {
                title: "Events",
                path: "/dashboard/events",
                icon: Calendar,
                subMenu: [
                    { title: "Assign Users & Roles", path: "/dashboard/events/assign-users" },
                    { title: "Event Sections", path: "/dashboard/events/sections" },
                ],
            },
        ];
    }
    return [
        { title: "Explore", path: "/dashboard/explore", icon: Compass },
        { title: "Stats", path: "/dashboard/stats", icon: BarChart },
    ];
};


export const dummyCommunities = [
    { id: "123", name: "Tech Enthusiasts", description: "A community for tech lovers." },
    { id: "102", name: "Gaming Zone", description: "For gamers and streamers." },
    { id: "103", name: "AI Researchers", description: "AI and ML discussion hub." },
];


export const dummyUsers = [
    { id: "u1", name: "Alice Johnson", role: "Admin" },
    { id: "u2", name: "Bob Smith", role: "Moderator" },
    { id: "u3", name: "Charlie Brown", role: "Event Manager" },
];


export const dummyEvents = [
    { id: "201", name: "Hackathon 2025", date: "2025-05-15", communityId: "101" },
    { id: "202", name: "Gaming Tournament", date: "2025-06-10", communityId: "102" },
    { id: "203", name: "AI Conference", date: "2025-07-20", communityId: "103" },
];

export const dummyRequests = [
    { id: "r1", name: "Eve Johnson", community: "Tech Enthusiasts" },
    { id: "r2", name: "Mark Lee", community: "AI Researchers" },
];
