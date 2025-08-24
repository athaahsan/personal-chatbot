import { useState, useEffect } from 'react'
import './App.css'

import UserInput from './components/UserInput';
import Navbar from './components/Navbar';
import Main from './components/Chat';

function App() {
  console.log("May God give me strength to let her go.");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div data-theme={theme} className='bg-base-300 font-geist'>
      <Navbar theme={theme} setTheme={setTheme} />
      <Main />
      <UserInput />
    </div>
  )
}

export default App
