const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Article = require('../models/Article')


// @desc Show single article
// @route GET /articles/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let article = await Article.findById(req.params.id)
       .populate('user')
       .lean()

    if (!article) {
      return res.render('error/404', {
        layout: 'dashboard'
      })
    }

    res.render('articles/show', {
      layout: 'dashboard',
      article
    })
  } catch (err) {
    console.error(err)
    res.render('error/404', {
      layout: 'dashboard'
    })
  }
})

module.exports = router