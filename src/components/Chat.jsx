import { div } from 'framer-motion/client'
import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks';
import { motion } from "framer-motion";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import "highlight.js/styles/github-dark.css";

const Chat = ({ listMessage }) => {
  return (
    <div className='px-5.5 flex-1'>
      <motion.div
        initial={{ filter: "blur(10px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className='flex max-w-3xl mx-auto mt-2 mb-10'>
          <div className="flex flex-col gap-10 w-full">
            {listMessage.map((msg, i) => (
              <div
                key={i}
                className={`${i % 2 !== 0 ? "text-base wrap-anywhere" : "wrap-anywhere text-base px-4 py-3 ml-auto max-w-[calc(100%-4rem)] rounded-tr-none bg-base-content/8 rounded-2xl flex justify-end w-fit"}`}
              >
                {i % 2 !== 0 && <div className='prose max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:shadow-none prose-pre:border-0'>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks,remarkMath]}
                    rehypePlugins={[rehypeHighlight,rehypeKatex]}
                  >
                    {msg}
                  </ReactMarkdown>
                </div>}
                {i % 2 === 0 && <div className='whitespace-pre-wrap'>
                  {msg}
                </div>}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  )
}

export default Chat