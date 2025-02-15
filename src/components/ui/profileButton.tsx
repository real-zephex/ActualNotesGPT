"use client";

import { handleModal } from "@/utils/handleModal";
import { signUpNewUser } from "@/utils/supabase/functions/accounts";
import { useState, useEffect, FormEvent, JSX } from "react";
import { BsMailbox } from "react-icons/bs";
import { CgPassword } from "react-icons/cg";

const ProfileButton = () => {
  const [messageBox, setMessageBox] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessageBox("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [messageBox]);

  // Function to handle form
  const handleForm = async (e: FormData) => {
    const email = e.get("email") as string;
    const password = e.get("password") as string;

    if (!email || !password) {
      setMessageBox("- All fields required");
      return;
    }

    const accountStatus = await signUpNewUser({ email, password });
    if (accountStatus?.status) {
      console.log("Account login successful.");
      setMessageBox("- Success.");
      setTimeout(() => {
        handleModal("hide", "accountsModal");
      }, 1500);
    } else {
      console.error("Account login failed.");
      setMessageBox(accountStatus?.error?.message || "An error occurred");
    }
  };

  return (
    <main className="w-full select-none">
      <div
        className="bg-base-200 w-full text-center p-2 rounded-xl cursor-pointer hover:bg-base-100 active:scale-95 text-white"
        onClick={() => handleModal("show", "accountsModal")}
      >
        <p>Accounts</p>
      </div>

      <dialog id="accountsModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Konichiwa!</h3>
          <p className="py-4">Login with your account to sync up your chats.</p>

          <form action={handleForm}>
            <label className="input input-bordered flex items-center gap-2">
              <BsMailbox />
              <input
                type="email"
                className="grow"
                placeholder="Email"
                name="email"
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mt-2">
              <CgPassword />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                required
              />
            </label>

            <button
              className={`btn ${
                !messageBox ? "btn-error" : "btn-success"
              } btn-outline w-full mt-2`}
              type="submit"
            >
              Login {messageBox}
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
};
export default ProfileButton;
