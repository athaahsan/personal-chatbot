import React from 'react'

import { MdOutlinePalette, MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { FaAdjust } from "react-icons/fa";




const Navbar = ({ theme, setTheme }) => {
    return (
        <>
            <div className="sticky top-0 navbar bg-base-200/80 backdrop-blur-lg z-50">
                <div className="navbar-start gap-5 ml-2 sm:ml-4">
                    <a
                        href="https://github.com/athaahsan/personal-chatbot"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        className="text-base-content/90 hover:text-base-content/50 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <title>GitHub</title>
                            <path d="M12 0C5.371 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.26.793-.577 0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.107-.775.418-1.305.762-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.649.241 2.873.119 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.371.823 1.103.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.192.694.801.576C20.565 21.796 24 17.3 24 12 24 5.373 18.627 0 12 0z" />
                        </svg>
                    </a>
                    <a
                        href="https://instagram.com/athaahsan"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram Profile"
                        className="text-base-content/90 hover:text-base-content/50 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <title>Instagram</title>
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                        </svg>
                    </a>
                    <a
                        href="https://linkedin.com/in/athaahsan"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                        className="text-base-content/90 hover:text-base-content/50 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <title>LinkedIn</title>
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.372-1.852 3.605 0 4.268 2.373 4.268 5.457v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.91 20.452H3.764V9h3.146v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                        </svg>
                    </a>
                </div>
                <div className="navbar-center">

                </div>
                <div className="navbar-end mr-2 sm:mr-4">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-sm btn-accent btn-circle transition-colors ">
                            <MdOutlinePalette size={24} />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content bg-base-100 rounded-lg z-1 mt-4 w-32 join-vertical p-0 border border-base-content/10 before:absolute before:inset-0 before:bg-white/2 before:rounded-lg"
                        >
                            {[
                                "System",
                                "Light",
                                "Dark",
                                "Dim",
                                "Dracula",
                                "Nord",
                                "Winter",
                            ].map((item, index, arr) => {
                                const value = item.toLowerCase();
                                const id = `radio${index + 1}`;

                                let roundedClass = "rounded-none";
                                if (index === 0) roundedClass = "rounded-t-lg";
                                else if (index === arr.length - 1) roundedClass = "rounded-b-lg";

                                return (
                                    <React.Fragment key={id}>
                                        <li className="">
                                            <input
                                                type="radio"
                                                name="options"
                                                id={id}
                                                className="hidden peer"
                                                checked={theme === value}
                                                onChange={() => setTheme(value)}
                                            />
                                            <label
                                                htmlFor={id}
                                                className={`min-w-0 w-full font-normal join-item btn btn-ghost ${roundedClass} peer-checked:bg-primary peer-checked:text-primary-content flex justify-between items-center`}
                                            >
                                                {item}
                                                {["Light", "Winter", "Nord"].includes(item) && <MdOutlineLightMode />}
                                                {["Dark", "Dim", "Dracula"].includes(item) && <MdOutlineDarkMode />}
                                                {["System"].includes(item) && <FaAdjust />}
                                            </label>
                                        </li>
                                        {index < arr.length - 1 && (
                                            <li className="border-t border-base-content/10 m-0"></li>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </ul>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar