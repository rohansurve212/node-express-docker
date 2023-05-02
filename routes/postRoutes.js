/** @format */

const express = require('express')

const {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(protect, getAllPosts).post(protect, createPost)
router
  .route('/:id')
  .get(protect, getOnePost)
  .put(protect, updatePost)
  .delete(protect, deletePost)

module.exports = router
