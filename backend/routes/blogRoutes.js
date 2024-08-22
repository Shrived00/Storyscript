const express = require("express")
const { getBlogs, createBlogs, getBlogById, updateBlog, deleteBlog, globalBlogs, getglobalBlogById } = require("../controllers/blogControllers")
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(protect, getBlogs)
router.route('/global').get(globalBlogs)

router.route('/create').post(protect, createBlogs)
router.route('/:id').get(protect, getBlogById).put(protect, updateBlog).delete(protect, deleteBlog)


/////
router.route('/global').get(globalBlogs);
router.route('/global/:id').get(getglobalBlogById)
/////
module.exports = router