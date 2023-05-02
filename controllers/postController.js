/** @format */

const Post = require('../models/postModel')

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
    res.status(200).json({
      status: 'Success',
      results: posts.length,
      data: {
        posts,
      },
    })
    next()
  } catch (e) {
    res.status(400).json({
      status: 'Failed',
    })
  }
}

exports.getOnePost = async (req, res, next) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId)
    res.status(200).json({
      status: 'Success',
      data: {
        post,
      },
    })
    next()
  } catch (e) {
    res.status(400).json({
      status: 'Failed',
    })
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const post = req.body
    const createdPost = await Post.create(post)
    res.status(200).json({
      status: 'Success',
      data: {
        createdPost,
      },
    })
    next()
  } catch (e) {
    console.log(e)
    res.status(400).json({
      status: 'Failed',
    })
  }
}

exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id
    const updatedContent = req.body
    const post = await Post.findByIdAndUpdate(postId, updatedContent, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      status: 'Success',
      data: {
        post,
      },
    })
    next()
  } catch (e) {
    res.status(400).json({
      status: 'Failed',
    })
  }
}

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id
    const post = await Post.findByIdAndDelete(postId)
    res.status(200).json({
      status: 'Success',
    })
    next()
  } catch (e) {
    res.status(400).json({
      status: 'Failed',
    })
  }
}
