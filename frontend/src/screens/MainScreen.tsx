import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { listBlog } from "../state/blog/blogSlice";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Avatar } from "../components/ui/avatar";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

const MainScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.blog
  );
  // const { success: successCreate } = useSelector(
  //   (state: RootState) => state.blogCreate,
  // );
  // const { success: successUpdate } = useSelector(
  //   (state: RootState) => state.blogUpdate,
  // );
  // const { success: successDelete } = useSelector(
  //   (state: RootState) => state.blogDelete,
  // );
  // const { success: successProfile } = useSelector(
  //   (state: RootState) => state.profileCreate,
  // );

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

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs &&
            [...blogs].reverse().map((blog) => (
              <Card key={blog._id} className="relative overflow-hidden">
                {blog.pic && (
                  <img
                    src={blog.pic}
                    alt="Blog Cover"
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardContent>
                  <h2 className="text-lg font-semibold">{blog.title}</h2>
                  <p className="text-muted-foreground">{blog.caption}</p>
                  <Separator className="my-2" />
                  <p className="text-sm text-muted-foreground">
                    {blog.desc.split(" ").slice(0, 50).join(" ")}
                    {blog.desc.split(" ").length > 50 ? "..." : ""}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm">
                  <Button
                    variant="link"
                    onClick={() => navigate(`/${blog._id}`)}
                  >
                    More...
                  </Button>
                  <span>
                    {typeof blog.createdAt === "string"
                      ? blog.createdAt.substring(0, 10)
                      : blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
