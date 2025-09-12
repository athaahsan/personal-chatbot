import Chat from './Chat'
import Navbar from './Navbar';
import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { MdOutlineArrowDownward } from "react-icons/md";



const UserChatSupabase = ({ theme, setTheme, containerRef, showScrollBtn, inputHeight, scrollToBottom }) => {
    const { userId } = useParams();
    const [listMessage, setListMessage] = useState([]);

    useEffect(() => {
        async function fetchChat() {
            try {
                const res = await fetch("/.netlify/functions/getSupabase", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId }),
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch chat");
                }
                const result = await res.json();
                setListMessage(result.chat); // hasil array langsung masuk ke state
            } catch (err) {
                console.error("❌ Fetch error:", err);
            }
        }
        if (userId) {
            fetchChat();
        }
    }, [userId]);


    return (
        <motion.div
            initial={{ filter: "blur(10px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div
                ref={containerRef}
                data-theme={theme}
                className="bg-base-200 font-geist flex flex-col h-[100dvh] overflow-y-auto custom-scrollbar snap-y snap-mandatory"
            >
                <Navbar theme={theme} setTheme={setTheme} />
                <Chat listMessage={listMessage} />
                <AnimatePresence>
                    {showScrollBtn && listMessage.length !== 0 && (
                        <motion.button
                            onClick={scrollToBottom}
                            style={{ bottom: inputHeight + 16 }}
                            className="btn btn-circle btn-sm btn-soft btn-primary fixed inset-x-0 mx-auto z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            <MdOutlineArrowDownward size={22} />
                        </motion.button>
                    )}
                </AnimatePresence>

            </div>
        </motion.div>
    )
}

export default UserChatSupabase