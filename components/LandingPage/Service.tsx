// "use client";

// import { motion } from "framer-motion";
// import { Users, CalendarCheck, ClipboardList, Settings, FilePlus, Eye } from "lucide-react";
// import Image from "next/image";

// const Service = () => {
//     return (
//         <section className="py-16 px-6 md:px-12 lg:px-20  text-white relative overflow-hidden font-jura" id="service">
//             <div className="text-center mb-12">
//                 <h2 className="text-3xl md:text-4xl font-bold text-indigo-300">How Our Service Works</h2>
//                 <p className="text-base md:text-lg text-gray-300 mt-2 font-junge">Explore the roles and features of our platform</p>
//             </div>

//             {/* Grid for User and Admin sections */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//                 {/* User Role */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     className="bg-gray-800 p-6 rounded-lg shadow-lg"
//                 >
//                     <div className="flex items-center gap-4 mb-4">
//                         <div className="bg-indigo-600 p-3 rounded-full">
//                             <Users size={32} className="text-white" />
//                         </div>
//                         <h3 className="text-2xl font-semibold text-indigo-300">User Role</h3>
//                     </div>
//                     <p className="text-gray-300">
//                         Users can <strong>browse events</strong>, <strong>enroll in committees</strong>, track attendance, and explore upcoming college or inter-college events.
//                     </p>
//                     <ul className="mt-4 space-y-2 text-gray-400 font-junge">
//                         <li className="flex items-center gap-2">
//                             <CalendarCheck size={20} className="text-indigo-400" />
//                             Discover and register for events.
//                         </li>
//                         <li className="flex items-center gap-2">
//                             <ClipboardList size={20} className="text-indigo-400" />
//                             Track attendance and committee activities.
//                         </li>
//                     </ul>
//                 </motion.div>

//                 {/* Image for User Role */}
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.8 }}
//                     className="flex justify-center"
//                 >
//                     <Image
//                         src="/user-role.svg"
//                         alt="User Role Illustration"
//                         width={400}
//                         height={400}
//                         className="rounded-lg shadow-lg"
//                     />
//                 </motion.div>

//                 {/* Image for Admin Role (Flipped Position) */}
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.8 }}
//                     className="flex justify-center order-2 md:order-1"
//                 >
//                     <Image
//                         src="/admin-role.svg"
//                         alt="Admin Role Illustration"
//                         width={400}
//                         height={400}
//                         className="rounded-lg shadow-lg"
//                     />
//                 </motion.div>

//                 {/* Admin Role */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     className="bg-gray-800 p-6 rounded-lg shadow-lg order-1 md:order-2"
//                 >
//                     <div className="flex items-center gap-4 mb-4">
//                         <div className="bg-indigo-600 p-3 rounded-full">
//                             <Settings size={32} className="text-white" />
//                         </div>
//                         <h3 className="text-2xl font-semibold text-indigo-300">Admin Role</h3>
//                     </div>
//                     <p className="text-gray-300">
//                         Admins can <strong>create events</strong>, <strong>manage committees</strong>, and <strong>monitor event analytics</strong>.
//                     </p>
//                     <ul className="mt-4 space-y-2 text-gray-400">
//                         <li className="flex items-center gap-2">
//                             <FilePlus size={20} className="text-indigo-400" />
//                             Create and manage events.
//                         </li>
//                         <li className="flex items-center gap-2">
//                             <Eye size={20} className="text-indigo-400" />
//                             Monitor student engagement and attendance.
//                         </li>
//                     </ul>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default Service;


// components/LandingPage/Service.tsx
"use client";

import { motion } from "framer-motion";
import { Users, CalendarCheck, ClipboardList, Settings, FilePlus, Eye } from "lucide-react";
import Image from "next/image";

const Service = () => {
    return (
        <section className="py-16 px-6 md:px-12 lg:px-20 text-white relative overflow-hidden font-jura" id="service">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-300">
                    How It Works
                </h2>
                <p className="text-base md:text-lg text-gray-300 mt-2 font-junge">
                    A seamless experience for students and organizers alike.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Student Flow */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-indigo-600 p-3 rounded-full">
                            <Users size={32} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold text-indigo-300">
                            For Students
                        </h3>
                    </div>
                    <p className="text-gray-300">
                        Dive into a curated feed of events, join committees that ignite your passion, and build your campus story.
                    </p>
                    <ul className="mt-4 space-y-2 text-gray-400 font-junge">
                        <li className="flex items-center gap-2">
                            <CalendarCheck size={20} className="text-indigo-400" />
                            Personalized event recommendations
                        </li>
                        <li className="flex items-center gap-2">
                            <ClipboardList size={20} className="text-indigo-400" />
                            Easy sign-up and instant confirmations
                        </li>
                        <li className="flex items-center gap-2">
                            <Eye size={20} className="text-indigo-400" />
                            Track your participation and feedback
                        </li>
                    </ul>
                </motion.div>

                {/* Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center"
                >
                    <Image
                        src="/user-role.svg"
                        alt="Student engaging with events"
                        width={400}
                        height={400}
                        className="rounded-lg shadow-lg"
                    />
                </motion.div>

                {/* Illustration Flipped */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center order-2 md:order-1"
                >
                    <Image
                        src="/admin-role.svg"
                        alt="Organizer dashboard view"
                        width={400}
                        height={400}
                        className="rounded-lg shadow-lg"
                    />
                </motion.div>

                {/* Organizer Flow */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg order-1 md:order-2"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-indigo-600 p-3 rounded-full">
                            <Settings size={32} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold text-indigo-300">
                            For Organizers
                        </h3>
                    </div>
                    <p className="text-gray-300">
                        Effortlessly create, promote, and manage events—all from one powerful dashboard.
                    </p>
                    <ul className="mt-4 space-y-2 text-gray-400 font-junge">
                        <li className="flex items-center gap-2">
                            <FilePlus size={20} className="text-indigo-400" />
                            One-click event setup with rich media
                        </li>
                        <li className="flex items-center gap-2">
                            <ClipboardList size={20} className="text-indigo-400" />
                            Real-time registration & attendance tracking
                        </li>
                        <li className="flex items-center gap-2">
                            <Eye size={20} className="text-indigo-400" />
                            Insights dashboard to measure engagement
                        </li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default Service;
