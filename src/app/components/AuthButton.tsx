"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { FaUserAlt } from "react-icons/fa";

const ACTIVE_ROUTE =
  "py-1 px-2 rounded-full hover:bg-black hover:text-white hover:rounded-lg hover:transition hover:duration-250";
const INACTIVE_ROUTE =
  "py-1 px-2 text-black hover:text-black hover:bg-white";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    const profileImg = session?.user?.image;

    return (
      <>
        <img
          src={profileImg ?? ""}
          alt="Your Profile Picture"
          className="h-[50px] w-[50px] rounded-full mx-3"
        />

        <button
          className="border-black border px-4 py-1 rounded-md shadow-md  transition-transform transform ease-in duration-500 hover:rounded-lg hover:scale-105"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <div className="flex justify-center items-center rounded-full h-[50px] w-[50px] border-slate border mx-5">
        <FaUserAlt className="text-2xl" />
      </div>
      <button
        onClick={() => signIn()}
        className="border-black border px-4 py-1 rounded-md shadow-md  transition-transform transform ease-in duration-500 hover:rounded-lg hover:scale-105"
      >
        Sign in
      </button>
    </>
  );
}