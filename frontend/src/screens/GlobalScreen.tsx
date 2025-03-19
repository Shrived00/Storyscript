"use client";

import type React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalListBlog } from "../state/blog/blogSlice";
import type { RootState } from "../state/store";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ArrowUpRight } from "lucide-react";
// import Header from "@/components/Header";
// import Loading from "@/components/Loading";
// import ErrorMessage from "@/components/ErrorMessage";

const GlobalScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state: RootState) => state.blog);
  console.log("Blogs in Redux:", blogs);
  console.log(
    "Redux state:",
    useSelector((state: RootState) => state.blog),
  );

  useEffect(() => {
    dispatch(globalListBlog() as any);
  }, [dispatch]);

  return (
    <div>
      {/* <Header /> */}
      <div className="container mx-auto mt-6 px-4">
        {/* {loading && <Loading />}
        {error && <ErrorMessage>{error}</ErrorMessage>} */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs
            ?.slice()
            .reverse()
            .map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="block group relative"
              >
                <Card className="overflow-hidden border shadow-md p-2 rounded-none transition-all duration-300">
                  <div className="relative">
                    <img
                      src={blog.pic || "/placeholder.svg"}
                      alt={blog.title}
                      className="h-64 w-full object-cover transition-all duration-300 group-hover:blur-[2px]"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <ArrowUpRight className="h-12 w-12 text-primary bg-white rounded-full p-2 shadow-lg" />
                    </div>
                  </div>
                  <CardHeader className="px-2 -mt-3">
                    <div className="text-sm text-neutral-500 text-left mb-1">
                      {blog.category}
                    </div>

                    <CardTitle className="text-left">{blog.title}</CardTitle>
                    <p className="text-gray-500 text-sm text-left">
                      {blog.caption}
                    </p>
                    <p className="text-gray-500 text-sm text-left line-clamp-2">
                      {blog.desc}
                    </p>
                  </CardHeader>
                  <CardContent className="p-0 -mt-3">
                    <div className="flex mt-4 gap-3">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="text-xs text-gray-500">{blog._id}</p>
                        <p className="text-xs text-gray-500">
                          {blog.createdAt.substring(0, 10)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalScreen;
