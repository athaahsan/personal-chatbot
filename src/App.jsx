import { useState, useEffect, useRef } from 'react'
import './App.css'

import UserInput from './components/UserInput';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Welcoming from './components/Welcoming';
import UserChatSupabase from './components/UserChatSupabase';
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineArrowDownward } from "react-icons/md";
import { Routes, Route } from 'react-router-dom'
import { IoArrowDownOutline, IoImageOutline } from "react-icons/io5";




function App() {
  const [listMessage, setListMessage] = useState([]);
  const [listImagePreview, setListImagePreview] = useState([]);
  const [listImageData, setListImageData] = useState([]);
  const [convHistory, setConvHistory] = useState(``)
  const [showChat, setShowChat] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const dragCounter = useRef(0);



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

  const acceptImageFile = (file) => {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setFileError("Only PNG, JPG, or WebP images are supported");
      setTimeout(() => setFileError(""), 3000);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileError("Maximum file size is 10MB");
      setTimeout(() => setFileError(""), 3000);
      return;
    }
    setImagePreview(URL.createObjectURL(file));
    setImageData(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current -= 1;

    if (dragCounter.current <= 0) {
      setIsDragging(false);
      dragCounter.current = 0;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;

    const imageFile = files.find(file =>
      ["image/png", "image/jpeg", "image/webp"].includes(file.type)
    );

    if (imageFile) {
      acceptImageFile(imageFile);
    } else {
      setFileError("File extension not supported.");
      setTimeout(() => setFileError(""), 3000);
    }
  };



  return (
    <Routes>
      <Route path='/' element={
        <motion.div
          initial={{ filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {isDragging && (
            <motion.div
              className="fixed inset-0 bg-primary/10 backdrop-blur-lg z-200 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center text-lg font-medium text-base-content gap-2">
                <IoImageOutline size={64} />
                Drop image to attach
              </div>
            </motion.div>
          )}
          <div
            ref={containerRef}
            data-theme={theme}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="bg-base-200 font-geist flex flex-col h-[100dvh] overflow-y-auto custom-scrollbar snap-y snap-mandatory"
          >
            <Navbar theme={theme} setTheme={setTheme} />
            {!showChat && (
              <Welcoming userName={userName} setUsername={setUserName} />
            )}
            {showChat && (
              <Chat listMessage={listMessage} listImagePreview={listImagePreview} />
            )}
            <UserInput
              ref={inputRef}
              listMessage={listMessage}
              setListMessage={setListMessage}
              listImagePreview={listImagePreview}
              setListImagePreview={setListImagePreview}
              listImageData={listImageData}
              setListImageData={setListImageData}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              imageData={imageData}
              setImageData={setImageData}
              fileError={fileError}
              setFileError={setFileError}
              userName={userName}
              setUserName={setUserName}
              convHistory={convHistory}
              setConvHistory={setConvHistory}
              setShowChat={setShowChat}
              acceptImageFile={acceptImageFile}
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
                  <IoArrowDownOutline size={22} />
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
