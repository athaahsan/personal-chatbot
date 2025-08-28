import React from 'react'
import profilePic from '../assets/athaPic2.jpeg'
import { useState, useEffect, useRef } from 'react';



const Welcoming = ({ userName, setUsername }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [cursor, setCursor] = useState("|");
    useEffect(() => {
        const interval = setInterval(() => {
            setCursor((prev) => (prev === "|" ? " " : "|"));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const spanRef = useRef(null);
    const [inputWidth, setInputWidth] = useState(30);
    const placeholder = isFocused ? "" : `${cursor}...`;
    useEffect(() => {
        if (spanRef.current) {
            setInputWidth(spanRef.current.offsetWidth + 3);
        }
    }, [userName, placeholder]);

    return (
        <div className='px-5.5 flex-1 flex justify-center items-center text-2xl sm:text-3xl'>
            <div className='flex max-w-3xl mx-auto mt-2 mb-2'>
                <div className="flex flex-col gap-2 w-full">

                    <div className='flex flex-row justify-center items-center'>
                        <div className='opacity-50'>
                            Hi,&nbsp;
                        </div>
                        <div className='flex items-center relative inline-flex'>
                            {/* hidden span to measure text */}
                            <span
                                ref={spanRef}
                                className="absolute invisible whitespace-pre text-2xl sm:text-3xl font-normal"
                            >
                                {userName || placeholder}
                            </span>
                            <input
                                type="text"
                                placeholder={isFocused ? "" : `${cursor}...`}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                value={userName}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{
                                    width: inputWidth,
                                    transition: "width 0.15s ease-out",
                                }}
                                className="h-9 input input-ghost input-md rounded-none border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:bg-transparent focus:text-base-content hover:bg-transparent p-0 my-0 text-2xl sm:text-3xl "
                            />
                        </div>
                        <div className=''>
                            &nbsp;👋
                        </div>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <div className='opacity-50'>Ask me&nbsp;</div>
                        <p className="">anything</p>
                        <div className=''>&nbsp;✨</div>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <div className='opacity-50'>Or, if you're&nbsp;</div>
                        <p className="">curious</p>
                        <div className=''>&nbsp;🤔</div>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <div className='opacity-50'>Ask me about&nbsp;</div>
                        <p className="">him 👇</p>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <div className=''>
                            <img
                                className="mask mask-circle h-16 w-16 sm:h-20 sm:w-20 mt-2"
                                src={profilePic}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Welcoming