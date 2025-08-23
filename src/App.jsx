import { useState, useEffect } from 'react'
import './App.css'

import UserInput from './components/UserInput';

function App() {
  console.log("May God give me strength to let her go.");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dim";
  });

  //useEffect(() => {
    //localStorage.setItem("theme", theme);
  //}, [theme]);

  return (
    <div data-theme={theme} className='bg-base-200 min-h-screen'>
      
      <UserInput/>
    </div>
  )
}

export default App
