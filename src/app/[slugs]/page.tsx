"use client";

import { Messages } from "@/types";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { getAiResponse } from "@/utils/responses";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useHotkeys } from "react-hotkeys-hook";
import { FaDownload } from "react-icons/fa";
import Download from "@/utils/download";
import { getStoredDataTemp, storeData } from "@/utils/localStorage";

const ChatWindow = ({ params }: { params: Promise<{ slugs: string }> }) => {
  const { slugs } = React.use(params);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [query, setQuery] = useState<string>("");
  const [generating, setGenerating] = useState<boolean>(false);

  const [downloading, setDownloading] = useState<boolean>(false);

  // Ref for components
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputBoxRef = useRef<HTMLTextAreaElement>(null);

  function updateMessage(message: string, kind: "user" | "bot") {
    setMessages((prev) => {
      const temp: Messages[] = [...prev, { kind, message }];
      return temp;
    });
    storeData({ content: { message, kind }, uuid: slugs });
  }

  useHotkeys("ctrl+shift+esc", function () {
    if (inputBoxRef.current) {
      inputBoxRef.current.focus();
    }
  });

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (inputBoxRef.current) {
      inputBoxRef.current.focus();
    }
  }, [messages]);

  // Function to retrieve the chats from the local storage - TEMPORARY
  useEffect(() => {
    const messages = getStoredDataTemp(slugs);
    setMessages(messages);
  }, []);

  async function handleSubmit() {
    if (!query.trim()) return;

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

  async function handleDownload(content: string) {
    if (downloading) return;
    setDownloading(true);
    const blob = await Download(content);

    if (!blob?.status) {
      console.error("Failed to download PDF.");
      return;
    }

    const url = window.URL.createObjectURL(blob.content!);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.pdf";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a); // Clean up
    window.URL.revokeObjectURL(url); // Free memory
    setDownloading(false);
  }

  return (
    <main className="container mx-auto relative h-dvh flex flex-col">
      <div className="flex-grow overflow-y-auto">
        {messages.map((item, index) => (
          <React.Fragment key={index}>
            <div
              key={index}
              className={`chat ${
                item.kind == "user" ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-bubble">
                {item.kind === "bot" ? (
                  <div className="prose lg:prose-lg p-4 max-w-5xl">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      className="w-full"
                    >
                      {item.message}
                    </ReactMarkdown>
                    <section className="flex flex-row items-center">
                      <FaDownload
                        className="cursor-pointer"
                        onClick={() => handleDownload(item.message)}
                      />
                      {downloading && (
                        <p className="text-lime-300 ml-2 p-0">Downloading...</p>
                      )}
                    </section>
                  </div>
                ) : (
                  item.message
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
        {generating && (
          <div className="chat chat-start">
            <div className="chat-bubble">
              Hang tight! Our chat genie is working its magic... 🧞‍♂️
              <span className="loading loading-infinity loading-sm"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-gray-800 rounded-t-xl">
        <p className="p-1">👋 Ask me anything regarding academics.</p>
      </div>
      <div className="w-full join border-info border-[1px] flex items-center mb-2 rounded-t-none">
        <textarea
          className="textarea textarea-default w-full"
          placeholder="Enter anything related to studies...."
          wrap="soft"
          rows={3}
          onChange={(e) => {
            const temp = e.target.value;
            setQuery(temp);
          }}
          value={query}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && query) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={generating}
          ref={inputBoxRef}
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
