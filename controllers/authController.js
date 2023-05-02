/** @format */

const User = require('../models/userModel')

const bcrypt = require('bcryptjs')

exports.signUp = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 12)
    const createdUser = await User.create({
      username,
      password: hashedPassword,
    })
    req.session.user = createdUser
    res.status(201).json({
      status: 'Success',
      data: {
        user: createdUser,
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

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({
        status: 'Failed',
        message: 'User not found',
      })
    }
    const isCorrect = await bcrypt.compare(password, user.password)
    if (isCorrect) {
      req.session.user = user
      res.status(201).json({
        status: 'Success',
        data: {
          user,
        },
      })
      next()
    } else {
      return res.status(400).json({
        status: 'Failed',
        message: 'Incorrect username or password',
      })
    }
  } catch (e) {
    res.status(400).json({
      status: 'Failed',
    })
  }
}
