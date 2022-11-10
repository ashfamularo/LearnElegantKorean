const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Article = require('../models/Article')

// @desc  Landing Page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('index', {
    layout: 'main',
  })
})

// @desc  Dashboard
// @route GET /dashboard
// router.get('/dashboard', ensureAuth, (req, res) => {
//   res.render('dashboard', {
//     layout: 'main',
//   })
// })
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const articles = await Article.find({ user: req.user.id }).lean()
    res.render('dashboard', {
      layout: 'dashboard',
      articles
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router