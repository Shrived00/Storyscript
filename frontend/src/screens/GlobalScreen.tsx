"use client";

import type React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalListBlog } from "../state/blog/blogSlice";
import type { AppDispatch, RootState } from "../state/store";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ArrowUpRight } from "lucide-react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const GlobalScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.blog
  );

  useEffect(() => {
    dispatch(globalListBlog());
  }, [dispatch]);

  return (
    <div className="bg-[#F5D04E]/10 min-h-screen py-8 font-['Figtree_Variable',sans-serif]">
      <div className="container mx-auto px-4">
        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs
            ?.slice()
            .reverse()
            .map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="block group h-full"
              >
                <Card className="h-full flex flex-col rounded-2xl border border-black shadow-[0.4rem_0.4rem_0_0_#000] overflow-hidden bg-white">
                  <div className="p-4 flex flex-col h-full gap-3">
                    <div className="relative rounded-xl overflow-hidden shadow-sm  ">
                      <img
                        src={blog.pic || "/placeholder.svg"}
                        alt={blog.title}
                        className="h-40 w-full object-cover transition-all duration-300 group-hover:scale-105 hover:blur-xs"
                      />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <ArrowUpRight className="h-10 w-10 text-primary bg-white rounded-full p-2 shadow-lg" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-bold">
                      <span className="rounded bg-[#F5D04E] px-2 py-1 shadow-[1px_1px_1px_0_rgba(0,0,0,.2)]">
                        {blog.category || "Article"}
                      </span>
                    </div>

                    <div className="text-[.7rem] font-[700] text-neutral-600 text-left">
                      {typeof blog.createdAt === "string"
                        ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : new Date(blog.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                    </div>

                    <h3 className="text-lg font-[800] line-clamp-1 text-left">
                      {blog.title}
                    </h3>

                    <p className="text-xs font-[600] text-neutral-400 line-clamp-2 text-left">
                      {blog.desc}
                    </p>

                    <div className="flex items-center gap-3 mt-auto pt-2">
                      <Avatar className="size-7">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      {/* <div className="text-sm font-[800]">{blog._id}</div> */}
                      <div className="text-sm font-[800]">username</div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalScreen;
