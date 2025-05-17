// Navbar.tsx

"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "lucide-react";
import { toast } from "react-hot-toast";
import type { RootState } from "../state/store";
import { logout } from "../state/auth/userSlice";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/global");
  };
  console.log(userInfo);
  return (
    <nav className="bg-white border-b border-black shadow-[0_0.4rem_0_0_#000] sticky top-0 z-50">
      <div className="max-w-[1440px] container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-[900] tracking-tight text-black">
          StoryScript
        </Link>

        <div className="flex items-center gap-4">
          {userInfo && (
            <>
              <Link
                to={`/profile/${userInfo._id}`}
                className="text-sm font-[700] text-black hover:text-primary transition-colors"
              >
                MyProfile
              </Link>
              <Link
                to="/main"
                className="text-sm font-[700] text-black hover:text-primary transition-colors"
              >
                MyPosts
              </Link>

              <Link
                to="/post"
                className="text-sm font-[700] text-black hover:text-primary transition-colors"
              >
                Write
              </Link>
              <div className="flex items-center gap-2 border rounded-sm px-2 bg-muted">
                <span className="text-sm font-[800]">{userInfo.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm font-[700] text-red-600 hover:text-red-800 transition-colors"
              >
                Logout
              </button>
            </>
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
