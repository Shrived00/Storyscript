import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "../state/blog/blogSlice";
import type { RootState, AppDispatch } from "../state/store";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Loading from "../components/Loading";

const SinglePostScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const contentRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedBlog, loading, error } = useSelector(
    (state: RootState) => state.blog
  );
  const { userInfo } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [userInfo, navigate, location]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setTimeout(() => {
      setReady(true);
    }, 50);
    if (id) dispatch(getBlogById(id));
  }, [dispatch, id]);

  const { scrollYProgress } = useScroll({
    target: ready ? contentRef : undefined,
    offset: ["start start", "end start"],
  });

  const imageHeight = useTransform(
    scrollYProgress,
    [0, 0.25],
    ["60vh", "20vh"]
  );
  const imageTop = useTransform(scrollYProgress, [0, 0.25], ["0vh", "5vh"]);

  const imagePosition = useTransform(
    scrollYProgress,
    [0, 0.25],
    ["relative", "sticky"]
  );
  const contentMargin = useTransform(
    scrollYProgress,
    [0, 0.25],
    ["0px", "0px"]
  );
  const postUrl = selectedBlog?._id
    ? `https://storyscript.vercel.app/blog/${selectedBlog._id}`
    : "https://storyscript.vercel.app/"; // fallback or homepage

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="h-full bg-[#F5D04E]/10 flex items-center justify-center font-['Figtree_Variable',sans-serif]">
        <Card className="p-6 rounded-2xl border border-black shadow-[0.4rem_0.4rem_0_0_#000] max-w-md">
          <h2 className="text-xl font-[800] mb-4">Error</h2>
          <p className="text-neutral-600">{error}</p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center text-sm font-[700] text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to blogs
          </Link>
        </Card>
      </div>
    );

  if (!selectedBlog)
    return (
      <div className=" bg-[#F5D04E]/10 flex items-center justify-center font-['Figtree_Variable',sans-serif]">
        <Card className="p-6 rounded-2xl border border-black shadow-[0.4rem_0.4rem_0_0_#000] max-w-md">
          <h2 className="text-xl font-[800] mb-4">Blog Not Found</h2>
          <p className="text-neutral-600">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center text-sm font-[700] text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to blogs
          </Link>
        </Card>
      </div>
    );

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className=" bg-[#F5D04E]/10 py-10 px-4 font-['Figtree_Variable',sans-serif]">
      <div className="container mx-auto max-w-4xl">
        <Link
          to="/global"
          className="inline-flex items-center mb-6 text-sm font-[700] text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to blogs
        </Link>

        <Card className="overflow-hidden rounded-2xl border border-black shadow-[0.4rem_0.4rem_0_0_#000] bg-white">
          <div className="p-6 md:p-8">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded bg-[#F5D04E] px-2 py-1 text-sm font-bold shadow-[1px_1px_1px_0_rgba(0,0,0,.2)]">
                  {selectedBlog.category || "Article"}
                </span>
                <span className="text-[.8rem] font-[700] text-neutral-600">
                  Published {formatDate(selectedBlog.createdAt)}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-[800] mb-4 text-left">
                {selectedBlog.title}
              </h1>

              {selectedBlog.caption && (
                <p className="text-lg text-neutral-600 font-[600] mb-6 text-left">
                  {selectedBlog.caption}
                </p>
              )}

              {/* Author info */}
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Author"
                  />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-[800]">
                    Author ID:{" "}
                    <Link
                      to={`/profile/${selectedBlog.user}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedBlog.authorName || "Random User"}
                    </Link>
                  </div>
                  <div className="text-xs text-neutral-500 text-left">
                    5 min read
                  </div>
                </div>
              </div>
            </div>

            {/* Content section with scroll-based animation */}
            <div ref={contentRef} className="relative">
              {/* Featured Image with animation */}
              {selectedBlog.pic && (
                <motion.div
                  className="overflow-hidden rounded-xl border border-black"
                  style={{
                    height: imageHeight,
                    position: imagePosition,
                    top: imageTop,
                  }}
                >
                  <motion.img
                    src={selectedBlog.pic || "/placeholder.svg"}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              )}

              {/* Text Content */}
              <motion.div
                className="prose max-w-none mt-8"
                style={{
                  marginLeft: contentMargin,
                }}
              >
                <motion.div
                  className="text-base leading-relaxed whitespace-pre-line text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {selectedBlog.desc}
                </motion.div>
              </motion.div>
            </div>

            {/* Tags or related content could go here */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-[800] mb-3">Share this article</h3>
              <div className="flex gap-3">
                {/* Twitter */}
                <motion.button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=Check out this article!&url=${postUrl}`,
                      "_blank"
                    )
                  }
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Twitter Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </motion.button>

                {/* Facebook */}
                <motion.button
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`,
                      "_blank"
                    )
                  }
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Facebook Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </motion.button>
                {/* Copy to Clipboard */}
                <motion.button
                  onClick={handleCopy}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Copy post URL"
                >
                  {copied ? (
                    <span className="text-green-600 font-semibold text-sm">
                      Copied!
                    </span>
                  ) : (
                    // Clipboard icon SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SinglePostScreen;
