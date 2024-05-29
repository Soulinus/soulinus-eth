import Link from "next/link";
import { MetaMaskIcon } from "../icons/metamask-icon";
import { MobileMenu } from "./mobile-menu";

export function TopNav() {
  return (
    <header className="absolute z-30 w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Site branding */}
          <div className="mr-4 shrink-0">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Soulinus">
              <img src="./logo.png" alt="logo" className="w-16" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow flex-wrap items-center justify-end">
              <li>
                <button
                  type="button"
                  className="mb-2 me-2 inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-700/70 dark:focus:ring-gray-600"
                >
                  <MetaMaskIcon />
                  Connect with MetaMask
                </button>
              </li>
            </ul>
          </nav>

          {/* <MobileMenu /> */}
        </div>
      </div>
    </header>
  );
}
