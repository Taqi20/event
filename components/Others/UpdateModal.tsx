import React from "react";

interface UpdatesModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateModal: React.FC<UpdatesModalProps> = ({ setIsModalOpen }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[600px]">
                <h2 className="text-xl font-semibold">Latest Updates</h2>
                <p className="text-sm mt-2">Here are the latest updates...</p>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UpdateModal;
