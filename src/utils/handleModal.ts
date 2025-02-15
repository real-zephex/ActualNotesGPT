const handleModal = (action: "show" | "hide", id: string) => {
  const el = document.getElementById(id) as HTMLDialogElement;
  if (action == "show") {
    el.showModal();
  } else {
    el.close();
  }
};

export { handleModal };
