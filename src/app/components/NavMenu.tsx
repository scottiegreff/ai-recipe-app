"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";


const ACTIVE_ROUTE =
  "py-1 px-2 rounded-full hover:bg-black hover:text-white hover:rounded-lg hover:transition hover:duration-250";
const INACTIVE_ROUTE =
  "py-1 px-2 text-black hover:text-black hover:bg-white hover:rounded-lg hover:transition hover:duration-500";

function AuthButton() {
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

export default function NavMenu() {
  const pathname = usePathname();
  return (
    <>
      {/* Nav Container */}
      <div className="flex justify-between items-center px-20 py-10 ">
        {/* logo here */}
        <div className="flex items-center">
          <GiKnifeFork className="text-5xl" />
          <a href="/" className="mx-5">
            AI RECIPE APP
          </a>
        </div>

        {/* div for grouping the right side of navbar TO SEPARATE NAV BETWEEN */}
        <div className="flex justify-between items-center w-100">
          {/* main nav here */}
          <Link
            href="/protected"
            className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}
          >
            Protected Route
          </Link>
          <Link
            href="/serverAction"
            className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}
          >
            Server Action
          </Link>
          <Link
            href="/apiFromClient"
            className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}
          >
            API From Client
          </Link>
          <Link
            href="/apiFromServer"
            className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}
          >
            API From Server
          </Link>
          
          {/* sign in and out button here with avatar */}
          <AuthButton />
        </div>
      </div>

      {/* <div>
        <AuthButton />
        <hr className="my-4" />
        <ul>
          <Link href="/">
            <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
              Home
            </li>
          </Link>
          <Link href="/protected">
            <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
              Protected Route
            </li>
          </Link>
          <Link href="/serverAction">
            <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
              Server Action
            </li>
          </Link>
          <Link href="/apiFromClient">
            <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
              API From Client
            </li>
          </Link>
          <Link href="/apiFromServer">
            <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
              API From Server
            </li>
          </Link>
        </ul>
      </div> */}
    </>
  );
}
