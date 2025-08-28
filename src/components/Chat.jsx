import { div } from 'framer-motion/client'
import React from 'react'

const Chat = ({ listUserMessage }) => {
  return (
    <div className='px-5.5 flex-1'>
      <div className='flex max-w-3xl mx-auto mt-2 mb-8'>
        <div className="flex flex-col gap-8 w-full">
          {/* Chat bubble dummy */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`${i % 2 !== 0 ? "text-base" : "text-base px-4 py-3 ml-auto max-w-[calc(100%-4rem)] rounded-tr-none bg-base-content/8 rounded-2xl flex justify-end w-fit"}`}
            >
              Pesan ke-{i + 1} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, maxime omnis laudantium vel ullam atque officia quia libero excepturi iusto quasi obcaecati assumenda, unde deleniti ipsum nesciunt architecto, harum repellat!
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chat