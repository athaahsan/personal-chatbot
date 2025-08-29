import { useState, useEffect } from 'react'
import './App.css'

import UserInput from './components/UserInput';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Welcoming from './components/Welcoming';
import { motion } from "framer-motion";


function App() {
  const hope = `
    May God 
    give me strength 
    to let her go.
    `;
  console.log(hope);

  const [listUserMessage, setListUserMessage] = useState(null);

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

  return (
    <div data-theme={theme} className="bg-base-200 font-geist flex flex-col h-[100dvh] overflow-y-auto custom-scrollbar snap-y snap-mandatory" >
      <Navbar theme={theme} setTheme={setTheme} />
      {listUserMessage === null && (
        <Welcoming userName={userName} setUsername={setUserName} />
      )}
      {listUserMessage !== null && (
        <Chat listUserMessage={listUserMessage} />
      )}
      <UserInput setListUserMessage={setListUserMessage} userName={userName} setUserName={setUserName} />
    </div>


  )
}

export default App
