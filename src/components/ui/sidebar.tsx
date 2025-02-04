"use client";
import { randomUUID } from "crypto";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [chats, setChats] = useState<string[]>([]);

  function handleNewChatWindows() {
    const id = crypto.randomUUID();
    setChats((prev) => {
      const temp: string[] = [...prev, id];
      return temp;
    });
    redirect(id);
  }

  return (
    <main
      className={`${
        isExpanded ? "w-64" : "w-0"
      } bg-base-300 h-dvh transition-width z-10 fixed transition-all overflow-hidden`}
      id="sidebar"
    >
      <section>
        <h2 className="font-sans text-lg ml-2 p-2 text-white font-bold">
          {isExpanded ? "Notes GPT" : "NG"}
        </h2>
        <div className="flex w-full flex-col -mt-6 px-2">
          <div className="divider divider-primary"></div>
        </div>
      </section>

      {/* New Chat Button */}
      <div className="mx-2">
        {chats &&
          chats.map((item, index) => (
            <Link href={item} key={index}>
              <div className="bg-gray-800 mb-2 p-1 rounded-lg select-none cursor-pointer">
                <p className="line-clamp-1">{item}</p>
              </div>
            </Link>
          ))}
        <button
          className="btn btn-info btn-sm w-full"
          onClick={() => handleNewChatWindows()}
        >
          {isExpanded ? "New Chat" : "+"}
        </button>
      </div>

      <button
        className="btn btn-secondary fixed top-1/2 left-0 transform -translate-y-1/2 mx-4 btn-sm no-animation hover:bg-lime-300 hover:border-0 border-0"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? <FaArrowCircleLeft /> : <FaArrowCircleRight />}
      </button>
    </main>
  );
};

export default Sidebar;
