import { useState, useEffect } from 'react'
import './App.css'

import UserInput from './components/UserInput';
import Navbar from './components/Navbar';
import Chat from './components/Chat';

function App() {
  console.log("May God give me strength to let her go.");
  console.log(('ontouchstart' in window) || navigator.maxTouchPoints > 0 ? "Mobile device detected." : "Desktop device detected.");
  console.log('ontouchstart', ('ontouchstart' in window));
  console.log('navigator.maxTouchPoints', navigator.maxTouchPoints);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const [vh, setVh] = useState(window.visualViewport?.height || window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setVh(window.visualViewport?.height || window.innerHeight);
    };
    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div data-theme={theme} className="bg-base-300 font-geist flex flex-col h-[100dvh] overflow-y-auto custom-scrollbar" >
      <Navbar theme={theme} setTheme={setTheme} />
        <Chat />
      <UserInput />
    </div>


  )
}

export default App
