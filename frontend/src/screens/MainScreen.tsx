import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { listBlog } from "../state/blog/blogSlice";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MainScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.blog
  );

  useEffect(() => {
    dispatch(listBlog());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-6">
        <h1 className="text-xl font-bold border-b pb-2">Your Blogs</h1>
        <div className="my-4">
          <Button
            onClick={() => navigate("/post")}
            className="flex items-center gap-2"
          >
            <Avatar className="bg-green-500 text-white p-1">+</Avatar>
            Create New Blog
          </Button>
        </div>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs &&
            [...blogs].reverse().map((blog) => (
              <Card
                key={blog._id}
                className="h-full flex flex-col rounded-2xl border border-black shadow-[0.4rem_0.4rem_0_0_#000] overflow-hidden bg-white"
              >
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
                    <div className="text-sm font-[800]">username</div>
                  </div>

                  {/* Edit Button */}
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/edit/${blog._id}`)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
