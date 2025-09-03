import React, { useState, useEffect, useRef, useLayoutEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import { PiSlidersHorizontal, PiNotePencil, PiGlobe, PiSmiley, PiArrowLeft, PiSmileyBlank, PiPencil } from "react-icons/pi";
import { MdAttachFile, MdOutlineEmojiEmotions, MdKeyboardArrowRight } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import { SlArrowRight } from "react-icons/sl";
import { BsEmojiSmileUpsideDown, BsGlobe2 } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";




const UserInput = forwardRef(({ userName, setUserName, setListMessage, listMessage, convHistory, setConvHistory }, ref) => {
    const messages = ["about Atha...", "anything..."];
    const [userMessage, setUserMessage] = useState(``);
    const [placeholder, setPlaceholder] = useState("");
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [menu, setMenu] = useState("main");
    const [menuOpen, setMenuOpen] = useState(false);
    const [timeNow, setTimeNow] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTimeNow(now);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const [responseStylePrompt, setResponseStylePrompt] = useState(() => {
        return localStorage.getItem("responseStylePrompt") || "Respond in a warm, approachable, and friendly manner, as if talking to a close friend. Use casual and conversational language.";
    });
    useEffect(() => {
        localStorage.setItem("responseStylePrompt", responseStylePrompt);
    }, [responseStylePrompt]);


    const [responseStyle, setResponseStyle] = useState(() => {
        return localStorage.getItem("responseStyle") || "friendly";
    });
    useEffect(() => {
        localStorage.setItem("responseStyle", responseStyle);
        if (responseStyle === "friendly") {
            setResponseStylePrompt("Respond in a warm, approachable, and friendly manner, as if talking to a close friend. Use casual and conversational language.");
        } else if (responseStyle === "academic") {
            setResponseStylePrompt("Respond in a precise, formal, and academic tone, as if writing a scholarly article. Use clear and structured language.");
        } else if (responseStyle === "concise") {
            setResponseStylePrompt("Respond in a short, direct, and to-the-point manner. Avoid unnecessary details and keep the response brief.");
        } else if (responseStyle === "cynic") {
            setResponseStylePrompt("Respond in a critical, sarcastic, and somewhat skeptical tone, as if questioning everything. Use wit and irony.");
        }
    }, [responseStyle]);

    const dropdownRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
                setMenu("main");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    useEffect(() => {
        if (index === messages.length) setIndex(0);
        const currentWord = messages[index];
        const baseText = "Ask me ";
        const typingSpeed = deleting ? 50 : 100;
        const timeout = setTimeout(() => {
            if (!deleting && subIndex <= currentWord.length) {
                setSubIndex((prev) => prev + 1);
                setPlaceholder(baseText + currentWord.substring(0, subIndex));
            } else if (deleting && subIndex >= 0) {
                setSubIndex((prev) => prev - 1);
                setPlaceholder(baseText + currentWord.substring(0, subIndex));
            } else if (!deleting && subIndex > currentWord.length) {
                setTimeout(() => setDeleting(true), 3000);
            } else if (deleting && subIndex < 0) {
                setDeleting(false);
                setIndex((prev) => (prev + 1) % messages.length);
            }
        }, typingSpeed);
        return () => clearTimeout(timeout);
    }, [subIndex, deleting, index]);

    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if (e.ctrlKey || e.altKey || e.metaKey) return;
            const active = document.activeElement;
            const isInputFocused = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");
            if (!isInputFocused && e.key.length === 1) {
                e.preventDefault();
                textareaRef.current?.focus();
                setUserMessage((prev) => prev + e.key);
            }
        };
        document.addEventListener("keydown", handleGlobalKeyDown);
        return () => document.removeEventListener("keydown", handleGlobalKeyDown);
    }, []);


    useLayoutEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            const newHeight = Math.min(textarea.scrollHeight, 200);
            textarea.style.height = `${newHeight}px`;
            textarea.style.overflowY = textarea.scrollHeight > 200 ? "auto" : "hidden";
        }
    }, [userMessage]);

    const handleKeyDown = (e) => {
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        if (isTouchDevice) return;
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = async () => {
        if (!userMessage.trim() && !imagePreview) return;
        const originalUserMessage = userMessage;
        console.log("[USER MESSAGE]:", userMessage);
        console.log("[USER NAME]:", userName);
        console.log("[RESPONSE STYLE]:", responseStylePrompt);
        console.log("[TIME NOW]:", timeNow)
        console.log('[CONVERSATION HISTORY (before)]:', convHistory)
        console.log("Picture (Base64):", imageData);
        setUserMessage("");
        setImagePreview(null);
        setImageData(null);
        setListMessage(prev => [...prev, originalUserMessage, '']);
        const response = await fetch("/aiResponse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                timeNow,
                responseStylePrompt,
                convHistory,
                userName,
                userMessage: originalUserMessage,
            }),
        });
        let finalResponse = "";
        const reader = response.body?.getReader();
        if (!reader) throw new Error("Response body not readable");
        const decoder = new TextDecoder();
        let buffer = "";
        let isDone = false;
        try {
            while (!isDone) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                let lineEnd;
                while ((lineEnd = buffer.indexOf("\n")) >= 0) {
                    const line = buffer.slice(0, lineEnd).trim();
                    buffer = buffer.slice(lineEnd + 1);

                    if (line.startsWith("data: ")) {
                        const data = line.slice(5).trim();
                        if (data === "[DONE]") {
                            isDone = true;
                            break;
                        }

                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices[0]?.delta?.content;
                            if (content) {
                                // Update AI bubble terakhir (append streaming)
                                finalResponse += content;
                                setListMessage(prev => {
                                    const newMessages = [...prev];
                                    newMessages[newMessages.length - 1] += content;
                                    return newMessages;
                                });
                            }
                        } catch (e) {
                            // JSON invalid
                        }
                    }
                }
            }
        } finally {
            reader.cancel();
        }
        setConvHistory(prev => {
            const newHistory = `${prev}USER: ${userMessage}
ASSISTANT: ${finalResponse}
                
`;
            console.log(`[CONVERSATION HISTORY (after)]:
${newHistory}`);
            return newHistory;
        });
        setUserMessage("");
        setImagePreview(null);
        setImageData(null);
    };

    return (
        <div className="sticky bottom-0 left-0 w-full px-2 pb-2 z-100" ref={ref}>
            <div className="m-0 p-0 max-w-3xl mx-auto bg-white/20 rounded-xl">
                <div className="flex max-w-3xl mx-auto bg-base-100/80 backdrop-blur-lg p-3 rounded-xl gap-2 flex-col border border-base-content/10">
                    <AnimatePresence>
                        {imagePreview && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="relative w-24 h-24"
                            >
                                <img src={imagePreview} alt="preview" loading="lazy" className="w-24 h-24 object-cover rounded-xl border border-base-content/10" />
                                <button
                                    type="button"
                                    onClick={() => setImagePreview(null)}
                                    className="absolute top-1 right-1 border border-base-content/10 cursor-pointer bg-base-300 text-xs rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    <LiaTimesSolid size={12} style={{ strokeWidth: 1 }} />
                                    <span className="absolute inset-[-6px]" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <textarea
                        ref={textareaRef}
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="text-base textarea textarea-bordered w-full resize-none min-h-0 textarea-ghost focus:outline-none focus:ring-0 focus:border-transparent focus:bg-transparent custom-scrollbar rounded-none px-0 py-0 mb-[5px]"
                        rows={1}
                        style={{ maxHeight: "200px" }}
                    />

                    <div className="flex justify-between items-end w-full gap-2">
                        <div className="flex gap-2">
                            <div>
                                <div className="toast toast-top toast-end z-50">
                                    {error && (
                                        <div className="alert alert-error">
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
                                                setError("Maximum file size is 10MB");
                                                e.target.value = "";
                                                setTimeout(() => setError(""), 3000);
                                                return;
                                            }
                                            console.log("Selected file:", file);
                                            setImagePreview(URL.createObjectURL(file));
                                            e.target.value = "";
                                            const reader = new FileReader();
                                            reader.onloadend = () => setImageData(reader.result);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                                <label htmlFor="fileInput" className="btn btn-sm p-2 rounded-lg btn-ghost border border-base-content/10 cursor-pointer" disabled={true}>
                                    <MdAttachFile size={16} />
                                </label>
                            </div>

                            <div ref={dropdownRef} className={`dropdown dropdown-top ${menuOpen ? "dropdown-open" : ""}`}>
                                <div
                                    role="button"
                                    className="btn btn-sm p-2 rounded-lg btn-ghost border border-base-content/10 "
                                    onClick={() => {
                                        setMenuOpen(!menuOpen);
                                        setMenu("main");
                                    }}
                                >
                                    <PiSlidersHorizontal size={16} />
                                </div>
                                {menu === "main" && (
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu bg-base-100 rounded-lg z-1 w-72 p-1 border border-base-content/10 mb-2 before:absolute before:inset-0 before:bg-white/2 before:rounded-lg"
                                    >
                                        <li
                                            onClick={(e) => {
                                                setMenu("responseStyle");
                                                setMenuOpen(true);
                                            }}>
                                            <div className="flex items-center justify-between w-full py-0 px-2 rounded-lg">
                                                <div className="flex items-center gap-2 h-8">
                                                    <PiSmiley size={20} />
                                                    <span className="px-0">Response style</span>
                                                </div>
                                                <MdKeyboardArrowRight size={20} />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center justify-between w-full py-0 px-2 rounded-lg">
                                                <div className="flex items-center gap-2 h-8">
                                                    <PiNotePencil size={20} />
                                                    <input
                                                        type="text"
                                                        placeholder="What's your name?"
                                                        value={userName}
                                                        onChange={(e) => setUserName(e.target.value)}
                                                        className="h-8 input input-ghost input-md w-56 border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:bg-transparent hover:bg-transparent px-0"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <div className="border-t border-base-content/10 mx-0.5 my-1"></div>
                                        <li className="">
                                            <div className="flex items-center justify-between w-full py-0 px-2 rounded-lg">
                                                <div className="flex items-center gap-2 h-8">
                                                    <PiGlobe size={20} />
                                                    <span className="px-0">Web search</span>
                                                </div>
                                                <input type="checkbox" className="toggle toggle-primary" disabled />
                                            </div>
                                        </li>
                                    </ul>
                                )}

                                {menu === "responseStyle" && (
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu bg-base-100 rounded-lg z-1 w-72 p-1 border border-base-content/10 mb-2 before:absolute before:inset-0 before:bg-white/2 before:rounded-lg"
                                    >
                                        <li onClick={(e) => {
                                            setResponseStyle("academic");
                                        }}>
                                            <div className={`flex items-center justify-between w-full py-0 px-2 rounded-lg ${responseStyle === "academic" ? "bg-base-300" : ""}`}>
                                                <div className="flex items-center gap-2 h-8">
                                                    <span className="text-base">🧐</span>
                                                    <span className="px-0">Academic</span>
                                                    <span className="opacity-50">precise and formal</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li onClick={(e) => {
                                            setResponseStyle("concise");
                                        }}>
                                            <div className={`flex items-center justify-between w-full py-0 px-2 rounded-lg ${responseStyle === "concise" ? "bg-base-300" : ""}`}>
                                                <div className="flex items-center gap-2 h-8">
                                                    <span className="text-base">😐</span>
                                                    <span className="px-0">Concise</span>
                                                    <span className="opacity-50">short and direct</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li onClick={(e) => {
                                            setResponseStyle("cynic");
                                        }}>
                                            <div className={`flex items-center justify-between w-full py-0 px-2 rounded-lg ${responseStyle === "cynic" ? "bg-base-300" : ""}`}>
                                                <div className="flex items-center gap-2 h-8">
                                                    <span className="text-base">🙄</span>
                                                    <span className="px-0">Cynic</span>
                                                    <span className="opacity-50">critical and sarcastic</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li onClick={(e) => {
                                            setResponseStyle("friendly");
                                        }}>
                                            <div className={`flex items-center justify-between w-full py-0 px-2 rounded-lg ${responseStyle === "friendly" ? "bg-base-300" : ""}`}>
                                                <div className="flex items-center gap-2 h-8">
                                                    <span className="text-base">😊</span>
                                                    <span className="px-0">Friendly</span>
                                                    <span className="opacity-50">warm and approachable</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className=""
                                            onClick={(e) => {
                                                setMenu("main");
                                                setMenuOpen(true);
                                            }}>
                                            <div className="flex items-center justify-between w-full py-0 px-2 rounded-lg">
                                                <div className="flex items-center gap-2 h-8">
                                                    <PiArrowLeft size={20} className="opacity-50" />
                                                    <span className="px-0 opacity-50">Back</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                )}
                            </div>

                        </div>

                        <button onClick={handleSend} disabled={!userMessage.trim() && !imagePreview} className="btn btn-sm p-2 rounded-lg btn-primary self-end">
                            <FiArrowUp size={16} />
                        </button>

                    </div>

                </div>
            </div>





        </div>
    );
});

export default UserInput;
