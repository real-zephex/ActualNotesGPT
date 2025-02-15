"use client";
// Local Storage Handler

import { Messages } from "@/types";

const storeData = ({ content, uuid }: { content: Messages; uuid: string }) => {
  const storage: Messages[] = JSON.parse(localStorage.getItem(uuid)!) || [];
  if (storage == null) {
    localStorage.setItem(uuid, JSON.stringify([]));
  }
  localStorage.setItem(uuid, JSON.stringify([...storage, content]));
};

const getStoredDataTemp = (uuid: string) => {
  const messages: Messages[] = JSON.parse(localStorage.getItem(uuid)!) || [];
  return messages;
};

const tabsStore = ({ uuid }: { uuid: string }) => {
  const storage: string[] = JSON.parse(localStorage.getItem("uuids")!) || [];
  if (storage == null) {
    localStorage.setItem("uuids", JSON.stringify([]));
  }
  localStorage.setItem("uuids", JSON.stringify([...storage, uuid]));
};

const getChatUUIDS = () => {
  const chats: string[] = JSON.parse(localStorage.getItem("uuids")!) || [];
  return chats;
};

export { storeData, getStoredDataTemp, tabsStore, getChatUUIDS };
