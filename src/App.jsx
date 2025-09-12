import { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom";
import './App.css'

import UserInput from './components/UserInput';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Welcoming from './components/Welcoming';
import UserChatSupabase from './components/UserChatSupabase';
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineArrowDownward } from "react-icons/md";
import { Routes, Route } from 'react-router-dom'



function App() {
  useEffect(() => {
    console.log(`
May God give me ignorance when it comes to knowing if she's finally with someone else.

May God give me blindness when it comes to seeing her in someone else's arms.

May God give me deafness when it comes to hearing her affectionate words for someone else.

May God give me forgetfulness when it comes to remembering the sweet memories I once shared with her.

May God give me strength to let her go.
`);
  }, []);

  const [listMessage, setListMessage] = useState([]);
  const [convHistory, setConvHistory] = useState(``)

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "";
  });
  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const containerRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 50;
      setShowScrollBtn(!atBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToBottom = () => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (listMessage.length > 0) {
      scrollToBottom();
    }
  }, [listMessage.length]);


  const inputRef = useRef(null);
  const [inputHeight, setInputHeight] = useState(0);
  useEffect(() => {
    if (!inputRef.current) return;
    const updateHeight = () => {
      setInputHeight(inputRef.current.offsetHeight);
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(inputRef.current);
    updateHeight();
    return () => observer.disconnect();
  }, []);



  return (
    <Routes>
      <Route path='/' element={
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
            {listMessage.length === 0 && (
              <Welcoming userName={userName} setUsername={setUserName} />
            )}
            {listMessage.length !== 0 && (
              <Chat listMessage={listMessage} />
            )}
            <UserInput
              ref={inputRef}
              listMessage={listMessage}
              setListMessage={setListMessage}
              userName={userName}
              setUserName={setUserName}
              convHistory={convHistory}
              setConvHistory={setConvHistory}
            />

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
      } />

      <Route path='/:userId' element={
        <UserChatSupabase
          theme={theme}
          setTheme={setTheme}
          containerRef={containerRef}
          showScrollBtn={showScrollBtn}
          inputHeight={inputHeight}
          scrollToBottom={scrollToBottom}
        />
      } />
    </Routes>

  )
}

export default App
