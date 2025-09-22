import React from 'react'
import profilePic from '../assets/athaPic4.jpeg'
import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";




const Welcoming = ({ userName, setUsername }) => {
    const [isFocused, setIsFocused] = useState(false); //userName input focused/not
    const [cursor, setCursor] = useState("|"); //blinking cursor for placeholder typing
    useEffect(() => {
        const interval = setInterval(() => {
            setCursor((prev) => (prev === "|" ? " " : "|"));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const spanRef = useRef(null);
    const [inputWidth, setInputWidth] = useState(32);
    const placeholder = ` ... `;
    useEffect(() => {
        if (spanRef.current) {
            setInputWidth(spanRef.current.offsetWidth + 3);
        }
    }, [userName, placeholder]);

    return (
        <div className='px-5.5 flex-1 flex justify-center text-2xl sm:text-3xl'>
            <div className='flex max-w-3xl mx-auto '>

                <div className="flex flex-col w-full ">

                    <div className='flex flex-col my-[50dvh] gap-2 flex items-center justify-center snap-center snap-always'>
                        <div className='flex flex-row justify-center items-center'>
                            <div className='opacity-50'>
                                Hi,&nbsp;
                            </div>
                            <div className={`flex items-center relative inline-flex ${!userName ? 'tooltip tooltip-open' : ""}`} data-tip="Type your name">
                                {/* hidden span to measure text */}
                                <span
                                    ref={spanRef}
                                    className="absolute invisible whitespace-pre text-2xl sm:text-3xl font-normal"
                                >
                                    {userName || placeholder}
                                </span>
                                <input
                                    type="text"
                                    placeholder={placeholder}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    value={userName}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{
                                        width: inputWidth,
                                        //transition: "width 0.15s ease-out",
                                    }}
                                    className="h-[31px] sm:h-[36px] input input-ghost input-md rounded-none border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:bg-transparent focus:text-base-content hover:bg-transparent p-0 my-0 text-2xl sm:text-3xl "
                                />
                            </div>
                            &nbsp;
                            <div className=''>
                                    👋
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
                                    className="mask mask-circle h-16 w-16 sm:h-20 sm:w-20 my-2"
                                    src={profilePic}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center my-[50dvh] justify-center snap-center snap-always w-fit self-center'>
                        <div className="mockup-code w-full rounded-2xl">
                            <pre data-prefix="1">
                                <code className='text-purple-400'>
                                    {`import `}
                                </code>
                                <code className='text-yellow-300'>
                                    {`{ `}
                                </code>
                                <code>
                                    {`❤️,🧠,🕒 `}
                                </code>
                                <code className='text-yellow-300'>
                                    {`} `}
                                </code>
                                <code className='text-purple-400'>
                                    {`from `}
                                </code>
                                <code className='text-orange-500'>
                                    {`'atha'`}
                                </code>
                                <code className=''>
                                    {`;`}
                                </code>
                            </pre>
                            <pre data-prefix="2">
                                <code className='text-purple-400'>
                                    {`import `}
                                </code>
                                <code className='text-blue-300'>
                                    {`Chatbot `}
                                </code>
                                <code className='text-purple-400'>
                                    {`from `}
                                </code>
                                <code className='text-orange-500'>
                                    {`'atha-ideas'`}
                                </code>
                                <code className=''>
                                    {`;`}
                                </code>
                            </pre>
                            <pre data-prefix="3"><code>{``}</code></pre>
                            <pre data-prefix="4">
                                <code className='text-blue-500/80'>
                                    {`function `}
                                </code>
                                <code className='text-yellow-100'>
                                    {`App`}
                                </code>
                                <code className='text-yellow-300'>
                                    {`() {`}
                                </code>
                            </pre>
                            <pre data-prefix="5">
                                <code className='text-blue-500/80'>
                                    {`  const `}
                                </code>
                                <code className='text-blue-400'>
                                    {`stuff `}
                                </code>
                                <code className=''>
                                    {`= `}
                                </code>
                                <code className='text-purple-400'>
                                    {`[`}
                                </code>
                                <code className=''>
                                    ❤️,🧠,🕒
                                </code>
                                <code className='text-purple-400'>
                                    {`]`}
                                </code>
                                <code className=''>
                                    ;
                                </code>
                            </pre>
                            <pre data-prefix="6">
                                <code className='text-purple-400'>
                                    {`  return (`}
                                </code>
                            </pre>
                            <pre data-prefix="7">
                                <code className='opacity-50'>
                                    {`    <>`}
                                </code>
                            </pre>
                            <pre data-prefix="8">
                                <code className='opacity-50'>
                                    {`      <`}
                                </code>
                                <code className='text-green-300'>
                                    {`Chatbot`}
                                </code>
                            </pre>
                            <pre data-prefix="9">
                                <code className='text-blue-300'>
                                    {`        madeWith`}
                                </code>
                                <code>
                                    {`=`}
                                </code>
                                <code className='text-blue-500'>
                                    {`{`}
                                </code>
                                <code className='text-blue-400'>
                                    {`stuff`}
                                </code>
                                <code className='text-blue-500'>
                                    {`}`}
                                </code>
                            </pre>
                            <pre data-prefix="10">
                                <code className='opacity-50'>
                                    {`      />`}
                                </code>
                            </pre>
                            <pre data-prefix="11">
                                <code className='opacity-50'>
                                    {`    </>`}
                                </code>
                            </pre>
                            <pre data-prefix="12">
                                <code className='text-purple-400'>
                                    {`  )`}
                                </code>
                            </pre>
                            <pre data-prefix="13">
                                <code className='text-yellow-300'>
                                    {`}`}
                                </code>
                            </pre>
                            <pre data-prefix="14"><code>{``}</code></pre>
                            <pre data-prefix="15">
                                <code className='text-purple-400'>
                                    {`export default `}
                                </code>
                                <code className='text-yellow-100'>
                                    {`App`}
                                </code>
                            </pre>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Welcoming