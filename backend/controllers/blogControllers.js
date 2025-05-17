const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ user: req.user._id });
  res.json(blogs);
});

const createBlogs = asyncHandler(async (req, res) => {
  const { title, caption, desc, category, pic, authorName } = req.body;

  if (!title || !caption || !desc || !category || !authorName) {
    res.status(400);
    throw new Error("Please Fill all the Fields");
  } else {
    const blog = new Blog({
      user: req.user._id,
      title,
      caption,
      desc,
      category,
      pic,
      authorName,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  }
});

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: "Note not Found" });
  }
});
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (blog) {
    await blog.deleteOne();
    res.json({ message: "Blog Removed" });
  } else {
    res.status(404);
    throw new Error("Blog not Found");
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { title, caption, desc, pic, category } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You acn perform this action");
  }
  if (blog) {
    blog.title = title;
    blog.caption = caption;
    blog.desc = desc;
    blog.pic = pic;
    blog.category = category;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// /////
const globalBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    // Handle the error
  }
});
const getglobalBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: "Note not Found" });
  }
});
// /////

module.exports = {
  getBlogs,
  createBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  globalBlogs,
  getglobalBlogById,
};
