"use client";

import { Messages } from "@/types";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { showHideBar } from "@/utils/hideSidebar";
import { IoSend } from "react-icons/io5";
import { getAiResponse } from "@/utils/responses";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatWindow = ({ params }: { params: Promise<{ slugs: string }> }) => {
  const { slugs } = React.use(params);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [query, setQuery] = useState<string>("");
  const [generating, setGenerating] = useState<boolean>(false);

  function updateMessage(message: string, kind: "user" | "bot") {
    setMessages((prev) => {
      const temp: Messages[] = [...prev, { kind, message }];
      return temp;
    });
  }

  async function handleSubmit() {
    setGenerating(true);
    updateMessage(query, "user");
    const res = await getResponse();
    updateMessage(res, "bot");
    setGenerating(false);
    setQuery("");
  }

  async function getResponse() {
    const response = await getAiResponse(query);
    return response;
  }

  return (
    <main className="container mx-auto relative h-dvh flex flex-col">
      <div className="flex-grow overflow-y-auto">
        {messages.map((item, index) => (
          <div
            key={index}
            className={`chat ${
              item.kind == "user" ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble">
              {item.kind === "bot" ? (
                <div className="prose lg:prose-lg p-4 max-w-5xl">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} className="w-full">
                    {item.message}
                  </ReactMarkdown>
                </div>
              ) : (
                item.message
              )}
            </div>
          </div>
        ))}
      </div>
      {generating ? <p>Generating response...</p> : <></>}
      <div className="w-full join border-info border-[1px] flex items-center mb-2">
        <textarea
          className="textarea textarea-default w-full"
          placeholder="Enter anything related to studies...."
          wrap="soft"
          rows={3}
          onChange={(e) => {
            const temp = e.target.value;
            if (temp.trim()) {
              setQuery(temp);
            }
          }}
          value={query}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={generating}
        ></textarea>
        <IoSend
          color="cyan"
          className="mx-2 cursor-pointer active:scale-90 transition-all"
          size={26}
          title="Send"
          onClick={() => {
            if (generating) return;
            handleSubmit();
          }}
        />
      </div>
    </main>
  );
};

export default ChatWindow;
