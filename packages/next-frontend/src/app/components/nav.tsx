"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between bg-slate-800 p-4">
      <ul className="flex gap-6">
        <li>
          <Link
            href="/"
            className={classNames([
              "text-white",
              pathname === "/" && "underline",
            ])}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/players"
            className={classNames([
              "text-white",
              pathname === "/players" && "underline",
            ])}
          >
            Players
          </Link>
        </li>
        <li>
          <Link
            href="/today"
            className={classNames([
              "text-white",
              pathname === "/today" && "underline",
            ])}
          >
            Today
          </Link>
        </li>
        <li>
          <Link
            href="/feed"
            className={classNames([
              "text-white",
              pathname === "/feed" && "underline",
            ])}
          >
            Feed
          </Link>
        </li>
      </ul>

      <Link href="/login">Login</Link>
    </nav>
  );
}
