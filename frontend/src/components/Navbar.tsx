import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "lucide-react";
import { toast } from "react-hot-toast";
import type { RootState } from "../state/store";
import { logout } from "../state/auth/userSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// adjust path as needed

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/global");
  };

  return (
    <nav className="bg-white border-b border-black shadow-[0_0.4rem_0_0_#000] sticky top-0 z-50">
      <div className="max-w-[1440px] container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-[900] tracking-tight text-black">
          StoryScript
        </Link>

        <div className="flex items-center gap-4 relative">
          {userInfo && (
            <>
              <Link
                to="/global"
                className="text-sm font-[700] text-black hover:text-primary transition-colors"
              >
                All post
              </Link>
              <Link
                to="/post"
                className="text-sm font-[700] text-black hover:text-primary transition-colors"
              >
                Write
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 border rounded-sm px-3 py-1 bg-muted hover:bg-gray-200 transition font-semibold text-sm">
                    {userInfo.name}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem asChild>
                    <Link to={`/profile/${userInfo._id}`}>My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/main"
                      className="text-sm font-[700] text-black hover:text-primary transition-colors"
                    >
                      MyPosts
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
