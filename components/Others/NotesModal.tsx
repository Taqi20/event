import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface NotesModalProps {
    setShowNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Note {
    id: string;
    content: string;
    timestamp: string;
}

const NotesModal: React.FC<NotesModalProps> = ({ setShowNoteModal }) => {
    const [noteText, setNoteText] = useState("");
    const [noteHistory, setNoteHistory] = useState<Note[]>([]);

    // Load notes from localStorage on mount
    useEffect(() => {
        const savedNotes = localStorage.getItem("userNotes");
        if (savedNotes) {
            setNoteHistory(JSON.parse(savedNotes));
        }
    }, []);

    // Save notes to localStorage
    const saveNotesToStorage = (notes: Note[]) => {
        localStorage.setItem("userNotes", JSON.stringify(notes));
    };

    const handleSave = () => {
        if (!noteText.trim()) return alert("Note is empty!");

        const newNote: Note = {
            id: uuidv4(),
            content: noteText,
            timestamp: new Date().toLocaleString(),
        };

        const updatedNotes = [newNote, ...noteHistory];
        setNoteHistory(updatedNotes);
        saveNotesToStorage(updatedNotes);
        setNoteText("");
    };

    const handleDelete = (id: string) => {
        const filteredNotes = noteHistory.filter((note) => note.id !== id);
        setNoteHistory(filteredNotes);
        saveNotesToStorage(filteredNotes);
    };

    const handleClear = () => {
        setNoteText("");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-[700px]">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Your Notes</h2>
                <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Write your notes here..."
                    className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-md resize-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="mt-4 flex justify-between flex-wrap gap-2">
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleClear}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                        Clear
                    </button>
                    <button
                        onClick={() => setShowNoteModal(false)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Close
                    </button>
                </div>

                {noteHistory.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Saved Notes</h3>
                        <ul className="space-y-3 max-h-[300px] overflow-y-auto">
                            {noteHistory.map((note) => (
                                <li
                                    key={note.id}
                                    className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm relative"
                                >
                                    <p className="text-gray-800 dark:text-white whitespace-pre-wrap">{note.content}</p>
                                    <span className="block text-xs text-gray-500 mt-2">{note.timestamp}</span>
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesModal;
