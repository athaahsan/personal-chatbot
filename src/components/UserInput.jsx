import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import { PiSlidersHorizontal, PiNotePencil, PiGlobe } from "react-icons/pi";
import { MdAttachFile } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import { FaTimes } from "react-icons/fa";




const UserInput = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageData, setImageData] = useState(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            const active = document.activeElement;
            const isInputFocused = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");
            if (!isInputFocused) {
                textareaRef.current?.focus();
                if (e.key.length === 1) {
                    setMessage((prev) => prev + e.key);
                }
            }
        };
        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, []);

    useLayoutEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            const newHeight = Math.min(textarea.scrollHeight, 200);
            textarea.style.height = `${newHeight}px`;
            textarea.style.overflowY = textarea.scrollHeight > 200 ? "auto" : "hidden";
        }
    }, [message]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        if (!message.trim() && !imagePreview) return;
        console.log("Kirim pesan:", message);
        console.log("Nama:", name);
        console.log("Gambar:", imagePreview);
        console.log("Data Gambar (Base64):", imageData);
        setMessage("");
        setImagePreview(null);
        setImageData(null);
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-base-200 border-t border-none p-4">
            <div className="flex max-w-3xl mx-auto bg-base-100 p-2.5 rounded-xl gap-2 flex-col border border-base-content/10">
                {imagePreview && (
                    <div className="relative w-24 h-24">
                        <img
                            src={imagePreview}
                            alt="preview"
                            className="w-24 h-24 object-cover rounded-2xl border border-base-content/10"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setImagePreview(null);
                            }}
                            className="absolute top-1 right-1 border border-base-content/10 cursor-pointer bg-base-300 text-xs rounded-full w-5.5 h-5.5 flex items-center justify-center"
                        >
                            <LiaTimesSolid size={12} style={{ strokeWidth: 1 }} />
                        </button>
                    </div>
                )}

                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    className="textarea textarea-bordered w-full resize-none min-h-0 textarea-ghost focus:outline-none focus:ring-0 focus:border-transparent focus:bg-base-100 custom-scrollbar px-1"
                    rows={1}
                    style={{ maxHeight: "200px" }}
                />

                <div className="flex justify-between items-end w-full gap-2">
                    <div className="flex gap-2">

                        <div>
                            <div className="toast toast-top toast-end z-50">
                                {error && (
                                    <div className="alert alert-error shadow-lg">
                                        <span>{error}</span>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                accept="image/png, image/jpeg, image/webp, image/gif"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        if (file.size > 10 * 1024 * 1024) {
                                            setError("File size must be under 10MB");
                                            e.target.value = "";
                                            setTimeout(() => setError(""), 3000);
                                            return;
                                        }
                                        console.log("Selected file:", file);
                                        setImagePreview(URL.createObjectURL(file));

                                        const reader = new FileReader();
                                        reader.onloadend = () => setImageData(reader.result);
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <label htmlFor="fileInput" className="btn btn-sm p-2 rounded-lg btn-ghost border border-base-content/10 cursor-pointer">
                                <MdAttachFile size={16} />
                            </label>
                        </div>

                        <div className="dropdown dropdown-top">
                            <div tabIndex={0} role="button" className="btn btn-sm p-2 rounded-lg btn-ghost border border-base-content/10">
                                <PiSlidersHorizontal size={16} />
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-lg z-1 w-52 p-2 shadow-sm border border-base-content/10 mb-2"
                            >
                                <li>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2 h-5">
                                            <PiGlobe size={18} />
                                            <span>Web search</span>
                                        </div>
                                        <input type="checkbox" className="toggle toggle-primary" disabled />
                                    </div>
                                </li>

                                <div className="my-2 border-t border-base-content/10"></div>

                                <li>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2 h-5">
                                            <PiNotePencil size={18} />
                                            <input
                                                type="text"
                                                placeholder="What's your name?"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="h-7 input input-ghost input-md w-34 border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:bg-transparent hover:bg-transparent px-0"
                                            />
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>

                    </div>

                    <button onClick={handleSend} disabled={!message.trim() && !imagePreview} className="btn btn-sm p-2 rounded-lg btn-primary self-end">
                        <FiArrowUp size={16} />
                    </button>

                </div>

            </div>
        </div>
    );
};

export default UserInput;
