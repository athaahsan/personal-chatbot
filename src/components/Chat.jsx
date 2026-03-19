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


const Chat = ({ listMessage, listImagePreview, loadingPhase, listWebSearchResult }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);


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
                className="hover:cursor-pointer absolute top-0 right-0 border border-base-content/10 bg-error text-error-content rounded-none w-6 h-6 flex items-center justify-center"
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
            {listMessage.map((msg, i) => {
              const webSearchData = listWebSearchResult[i];
              return (
                <div
                  key={i}
                  className={`${i % 2 !== 0 ? "text-base wrap-anywhere" : ""}`}
                >
                  {i % 2 !== 0 && (
                    <div className="space-y-0">
                      {webSearchData && (
                        <div className="collapse bg-base-200 rounded-none">
                          <input
                            type="checkbox"
                            checked={isAccordionOpen}
                            onChange={(e) => setIsAccordionOpen(e.target.checked)}
                            className="peer pointer-events-none"
                          />
                          <div
                            className="collapse-title text-sm cursor-pointer p-0 text-base-content/60 hover:text-base-content transition-colors duration-200"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsAccordionOpen(!isAccordionOpen);
                            }}
                          >
                            <div className="flex items-center justify-start gap-1">
                              <span>Searched the web</span>
                              <svg
                                className={`w-3.5 h-3.5 transition-transform duration-300 flex-shrink-0 ${isAccordionOpen ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                          <div className={`collapse-content text-sm p-0 m-0 transition-all duration-500 overflow-hidden ${isAccordionOpen
                              ? 'animate-[slideDown_0.5s_ease] max-h-[1000px] opacity-100'
                              : 'animate-[slideUp_0.5s_ease] max-h-0 opacity-0'
                            }`}>
                            <div className="m-0">
                              <div className="border border-base-content/10 rounded-lg p-4 bg-base-100 mb-2">
                                {/* Query */}
                                <div className="mb-2 pb-2">
                                  <p className="text-sm text-base-content/60">
                                    {(() => {
                                      try {
                                        const parsed = typeof webSearchData === 'string' ? JSON.parse(webSearchData) : webSearchData;
                                        return parsed.query;
                                      } catch (e) {
                                        return "Web search results";
                                      }
                                    })()}
                                  </p>
                                </div>

                                {/* URLs */}
                                {(() => {
                                  try {
                                    const parsed = typeof webSearchData === 'string' ? JSON.parse(webSearchData) : webSearchData;
                                    if (parsed.results && parsed.results.length > 0) {
                                      return (
                                        <div className="space-y-2">
                                          {parsed.results.map((result, idx) => (
                                            <a
                                              key={idx}
                                              href={result.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="flex items-center justify-between p-2 rounded-lg bg-primary/5 border border-base-content/10 hover:border-primary hover:bg-primary/5 transition group gap-2"
                                            >
                                              <div className="flex-1 min-w-0">
                                                <div className="text-xs font-medium text-base-content transition line-clamp-1">
                                                  {result.title}
                                                </div>
                                              </div>
                                              <div className="text-xs text-primary/80 group-hover:text-primary transition whitespace-nowrap flex-shrink-0 ml-2">
                                                {new URL(result.url).hostname}
                                              </div>
                                            </a>
                                          ))}
                                        </div>
                                      );
                                    }
                                    return null;
                                  } catch (e) {
                                    return <pre className="text-xs whitespace-pre-wrap break-words">{String(webSearchData)}</pre>;
                                  }
                                })()}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="prose max-w-none">
                        {listMessage[listMessage.length - 1] === "" && i === listMessage.length - 1 ? (
                          <div className="flex items-center gap-2 text-base-content/50 text-sm">
                            {loadingPhase === "searching" ? (
                              <div className='shimmer-text text-sm'>
                                Searching the web...
                              </div>
                            ) : (
                              <span className="loading loading-dots loading-xl"></span>
                            )}
                          </div>
                        ) : (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
                            rehypePlugins={[rehypeHighlight, rehypeKatex]}
                            components={{
                              img: ({ node, ...props }) => (
                                <img
                                  {...props}
                                  className="max-w-50 h-auto rounded-md cursor-pointer"
                                  alt={props.alt}
                                  onClick={() => setSelectedImage(props.src)}
                                />
                              ),
                            }}
                          >
                            {msg}
                          </ReactMarkdown>
                        )}
                      </div>
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
                        <div className='wrap-anywhere text-base px-4 py-3 ml-auto max-w-[calc(100%-4rem)] sm:max-w-[calc(100%-8rem)] rounded-tr-xs bg-base-content/10 rounded-2xl flex justify-end w-fit'>
                          <div className='whitespace-pre-wrap'>
                            {msg.trim()}
                          </div>
                        </div>}
                    </div>}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

    </div>
  )
}

export default Chat