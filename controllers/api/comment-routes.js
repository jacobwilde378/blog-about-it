const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth.js')

router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log("Error:  ",err)
        res.status(500).json(err)
    })
})

router.post('/',withAuth, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id:  req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router