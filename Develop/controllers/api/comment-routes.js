const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
    .then(CommentData_db => res.json(CommentData_db))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    if(req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        .then(CommentData_db => res.json(CommentData_db))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(CommentData_db => {
        if(CommentData_db) {
            res.status(404).json({ message: 'No comment found with id'});
            return;
        }
        res.json(CommentData_db);
    })
    .catch(err => {
        coneole.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;