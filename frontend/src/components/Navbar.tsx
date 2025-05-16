"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import { Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);

  return (
    <nav className="bg-white border-b border-black shadow-[0.0rem_0.4rem_0_0_#000] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-[900] tracking-tight text-black">
          Blogify
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-[700] text-black hover:text-primary transition-colors"
          >
            Home
          </Link>

          <Link
            to="/create"
            className="text-sm font-[700] text-black hover:text-primary transition-colors"
          >
            Write
          </Link>

          {userInfo && (
            <div className="flex items-center gap-2 border rounded-sm px-2 bg-muted">
              <span className="text-sm font-[800]">{userInfo.name}</span>
            </div>
          )}

          {/* Optional: Hamburger for mobile */}
          <button className="sm:hidden text-black hover:text-primary">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
