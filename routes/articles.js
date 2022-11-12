// const express = require('express')
// const router = express.Router()
// const { ensureAuth } = require('../middleware/auth')

// const Article = require('../models/Article')
// // @desc  Show all stories
// // @route GET /stories
// router.get('/dashboard', ensureAuth, async (req, res) => {
//   try {
//       const stories = await Article.find({ status: 'public'})
//         .sort({ createdAt: 'desc' })
//         .lean()
//       res.render('/dashboard', {
//         articles,
//       })
//   } catch (err) {
//     console.error(err)
//     res.render('error/500')
//   }
// })