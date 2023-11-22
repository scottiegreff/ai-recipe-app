"use client";
import Link from "next/link";
// import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import AuthButton from "./AuthButton";
import { authOptions } from "@/lib/nextauthOptions";
import { getServerSession } from "next-auth/next";

const ACTIVE_ROUTE =
  "py-1 px-3 md:mx-10 rounded-full text-xs md:text-lg hover:bg-black hover:text-white hover:rounded-lg hover:transition hover:duration-250";
const INACTIVE_ROUTE =
  "py-1 px-3 text-xs md:mx-10 md:text-lg text-black hover:text-black hover:bg-white hover:rounded-lg hover:transition hover:duration-500";

// async function someFunction(req: any) {
//   const session = await getServerSession(authOptions);
//   // Use the session data here
// }

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <>
      {/* Nav Container */}
      <div className="my-10 ms-2 md:ms-10 w-[80%] lg:w-full flex flex-row justify-between items-center">
        {/* logo here */}
        <div className="flex items-center">
          <GiKnifeFork className="text-xl lg:text-5xl" />
          <a href="/" className="mx-3 md:mx-5 text-sm md:text-xl">
            AI RECIPE APP
          </a>
        </div>

        {/* div for grouping the right side of navbar TO SEPARATE NAV BETWEEN */}
        <div className="flex justify-center items-center w-[25%] lg:w-[40%]">
          {/* main nav here */}
          <Link
            href="/members"
            className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}
            // onClick={() =>
            //   !session
            //     ? alert("Please use the SIGN IN button and become a MEMBER")
            //     : ""
            // }
          >
            MEMBERS
          </Link>
          {/* <Link
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
          </Link> */}

          {/* sign in and out button here with avatar */}
          <AuthButton />
        </div>
      </div>
    </>
  );
}
