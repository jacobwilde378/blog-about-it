const router = require('express').Router()
const {Post, User, Comment} = require('../../models')
const withAuth = require('../../utils/auth.js')

router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'title',
        'blog_text',
        'user_id',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at'
          ],
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
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log("Error:  ", err)
        res.status(500).json(err)
      })
  })

  router.get('/edit/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'blog_text',
        'user_id',
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
        console.log(dbPostData)
        const post = dbPostData.get({ plain: true })
        console.log(post)
        res.render('edit-post', { post, loggedIn: true })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.put('/:id', (req, res) => {
    console.log(req.session)
    Post.update(
      {title: req.body.title, blog_text: req.body.blog_text}, {
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      }
    )
    .then(affectedRows => {
      if(affectedRows > 0) {
        res.status(200).end()
      }
      else
      {
        res.status(404).end()
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })


  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'blog_text',
        'user_id',
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
        console.log(dbPostData)
        const post = dbPostData.get({ plain: true })
        console.log(post)
        if(req.session.loggedIn) {
          var my_status = true
        }
        else {
          var my_status = false
        }
        res.render('single-post', { post, my_status })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', (req, res) => {
    Post.create({
      title: req.body.title,
      blog_text: req.body.blog_text,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete("/:id",withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })
    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
  });

  module.exports = router