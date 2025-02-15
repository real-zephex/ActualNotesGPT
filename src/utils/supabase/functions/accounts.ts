"use server";

import { createClient } from "../server";
import { cookies } from "next/headers";

export async function signUpNewUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) return;

  const cookieStore = cookies();

  const supabase = await createClient(cookieStore);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,

    // options: {
    // emailRedirectTo: "https://example.com/welcome",
    // },
  });

  if (error) {
    // if (error.code == "over_email_send_rate_limit") {
    //   console.error(
    //     "Multiple sign ups spotted with credentials: ",
    //     email,
    //     password
    //   );
    //   return {
    //     status: true,
    //     error: "Boink! You are not that smart.",
    //   };
    // }
    console.error("Error signing up:", error);
    return {
      status: false,
      error: error,
    };
  } else {
    console.log("Sign up successful:", data);
    return {
      status: true,
      error: null,
    };
  }
}

export async function signInWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const cookieStore = cookies();

  const supabase = await createClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Sign in failed: ", error);
    return {
      status: false,
      error,
    };
  } else {
    console.log("Sign in successful.", data);
    return {
      status: true,
      error: null,
    };
  }
}
