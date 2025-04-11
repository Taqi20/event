'use client';
import React, { useState } from 'react';
import { IconUserCircle, IconPencil, IconDeviceFloppy, IconX, IconUpload } from '@tabler/icons-react';

interface UserProfileProps {
    setIsModalOpen: (isOpen: boolean) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ setIsModalOpen }) => {
    const [userData, setUserData] = useState({
        firstname: "Manu",
        lastname: "Arora",
        email: "manu@example.com",
        college: "Stanford University",
        rollno: "2023ABCD1234",
        collegeid: "STFD78945",
        department: "Computer Science",
        course: "Computer Science Engineering",
        year: "3rd Year",
        division: "A",
        role: "Student",
        address: "123 University Avenue, Palo Alto, CA 94301",
        image: "" // base64 or URL
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({ ...userData });

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData({ ...userData });
    };

    const handleCancel = () => setIsEditing(false);
    const handleSave = () => {
        setUserData({ ...editedData });
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const personalInfo: { label: string; field: keyof typeof userData }[] = [
        { label: "First Name", field: "firstname" },
        { label: "Last Name", field: "lastname" },
        { label: "Email", field: "email" },
        { label: "Address", field: "address" }
    ];

    const academicInfo: { label: string; field: keyof typeof userData }[] = [
        { label: "College", field: "college" },
        { label: "College ID", field: "collegeid" },
        { label: "Roll Number", field: "rollno" },
        { label: "Department", field: "department" },
        { label: "Course/Program", field: "course" },
        { label: "Academic Year", field: "year" },
        { label: "Division", field: "division" }
    ];

    return (
        <div className="fixed inset-0 h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[800px] max-h-[90vh] overflow-y-auto custom-scrollbar">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                    <h2 className="text-2xl font-semibold flex items-center">
                        <IconUserCircle className="mr-2 text-blue-500" size={28} />
                        User Profile
                    </h2>
                    <div className="flex gap-2">
                        {!isEditing ? (
                            <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1">
                                <IconPencil size={18} />
                                Edit Profile
                            </button>
                        ) : (
                            <>
                                <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-1">
                                    <IconDeviceFloppy size={18} />
                                    Save
                                </button>
                                <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-1">
                                    <IconX size={18} />
                                    Cancel
                                </button>
                            </>
                        )}
                        <button onClick={() => setIsModalOpen(false)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                            Close
                        </button>
                    </div>
                </div>

                {/* Image Upload Section */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img
                            src={isEditing ? editedData.image || "/default-avatar.png" : userData.image || "/default-avatar.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                        />
                        {isEditing && (
                            <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
                                <IconUpload size={18} className="text-white" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* Personal & Academic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal Info */}
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <div className="space-y-4">
                            {personalInfo.map(item => (
                                <div key={item.field}>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{item.label}</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name={item.field}
                                            value={editedData[item.field]}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                                        />
                                    ) : (
                                        <div className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
                                            {userData[item.field]}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                                <div className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700">
                                    {userData.role} <span className="text-xs text-gray-500">(not editable)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Info */}
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
                        <div className="space-y-4">
                            {academicInfo.map(item => (
                                <div key={item.field}>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{item.label}</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name={item.field}
                                            value={editedData[item.field]}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                                        />
                                    ) : (
                                        <div className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
                                            {userData[item.field]}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
