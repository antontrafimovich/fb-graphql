"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="bg-slate-800 p-4">
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
      </ul>
    </nav>
  );
}
