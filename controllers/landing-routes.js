const router = require('express').Router()
const { Post, User, Comment } = require('../models')
const withAuth = require('../utils/auth.js')

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'blog_text',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(req.session)
      if(req.session.loggedIn) {
        var my_status = true
      }
      else {
        var my_status = false
      }
      console.log("status:  ", my_status)
      res.render('landing', {
        posts,
        my_status
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.render('dashboard')
  }
  else {
    res.render('login', {

    })
  }
})

module.exports = router