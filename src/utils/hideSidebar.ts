"use client";

export const showHideBar = (action: "show" | "hide") => {
  const el = document.getElementById("sidebar") as HTMLDivElement;
  if (action == "hide") {
    el.style.display = "none";
  } else {
    el.style.display = "block";
  }
};
