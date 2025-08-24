import { useState, useEffect } from 'react'
import './App.css'

import UserInput from './components/UserInput';
import Navbar from './components/Navbar';
import Main from './components/Chat';

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

  return (
    <div data-theme={theme} className='bg-base-300 font-geist h-[100dvh] flex flex-col overflow-auto'>
      <Navbar theme={theme} setTheme={setTheme} />
      <Main />
      <UserInput />
    </div>
  )
}

export default App
