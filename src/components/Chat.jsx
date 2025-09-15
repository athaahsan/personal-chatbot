import { useState } from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks';
import { motion, AnimatePresence } from "framer-motion";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "highlight.js/styles/github-dark.css";
import { LiaTimesSolid } from "react-icons/lia";


const Chat = ({ listMessage, listImagePreview }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className='px-5.5 flex-1'>
      {selectedImage && (
        <AnimatePresence>
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-500"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key="image"
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <img
                src={selectedImage}
                alt="full"
                className="max-h-[90dvh] max-w-[90dvw] h-[90dvh] w-[90dvw] object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 border border-base-content/10 bg-error text-error-content rounded-none w-6 h-6 flex items-center justify-center"
              >
                <LiaTimesSolid size={16} style={{ strokeWidth: 1 }} />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

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
                className={`${i % 2 !== 0 ? "text-base wrap-anywhere" : ""}`}
              >
                {i % 2 !== 0 && (
                  <div className="prose max-w-none">
                    {listMessage[listMessage.length - 1] === "" && i === listMessage.length - 1 ? (
                      <span className="loading loading-dots loading-xl"></span>
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
                        rehypePlugins={[rehypeHighlight, rehypeKatex]}
                        components={{
                          img: ({ node, ...props }) => (
                            <img
                              {...props}
                              className="max-w-50 h-auto rounded-md"
                              alt={props.alt}
                            />
                          ),
                        }}
                      >
                        {msg}
                      </ReactMarkdown>
                    )}
                  </div>
                )}
                {i % 2 === 0 &&
                  <div className='flex flex-col gap-2 items-end'>
                    {listImagePreview[i] && (
                      <div>
                        <img
                          src={listImagePreview[i]}
                          alt="preview"
                          className="w-50 h-50 object-cover rounded-xl border border-base-content/10 cursor-pointer"
                          onClick={() => setSelectedImage(listImagePreview[i])}
                        />
                      </div>
                    )}
                    {msg &&
                    <div className='wrap-anywhere text-base px-4 py-3 ml-auto max-w-[calc(100%-4rem)] rounded-tr-none bg-base-content/10 rounded-2xl flex justify-end w-fit'>
                      <div className='whitespace-pre-wrap'>
                        {msg}
                      </div>
                    </div>}
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