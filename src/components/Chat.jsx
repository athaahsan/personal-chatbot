import { div } from 'framer-motion/client'
import React from 'react'

const Chat = () => {
  return (
    <div className='px-4'>
      <div className='flex max-w-3xl mx-auto mt-3 mb-7'>
        <div className="flex flex-col gap-6 w-full">
          {/* Chat bubble dummy */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`chat ${i % 2 !== 0 ? "" : "chat-end"
                }`}
            >
              <div className={`${i % 2 !== 0 ? "text-base" : "text-base chat-bubble bg-base-100 rounded-2xl"}`}>
                Pesan ke-{i + 1} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chat