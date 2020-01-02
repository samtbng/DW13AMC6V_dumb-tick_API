const models = require('../models')
const likes = models.likes
const events = models.events
const users = models.users

exports.index = (req, res) => {
    likes.findAll(
        {
            attributes: ['id','userId', 'eventId'],
            // include: [
            //     {
            //         model: users,
            //         as: 'usersLikes',
            //         attributes: { exclude: ['password', 'createdAt', 'updaatedAt'] }
            //     },
            //     {
            //         model: events,
            //         as: 'eventsLiked',
            //         attributes: { exclude: ['createdAt', 'updatedAt'] }
            //     }
            // ]
        })
        .then(data => {
            res.send(data)
        }).catch(err => res.send(err))
}

exports.show = (req, res) => {
    likes.findAll(
        {
            where: { userId: req.params.id },
            attributes: ['userId', 'eventId'],
            include: [
                {
                    model: users,
                    as: 'usersLikes',
                    attributes: { exclude: ['password', 'createdAt', 'updaatedAt'] }
                },
                {
                    model: events,
                    as: 'eventsLiked',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ]
        })
        .then(data => {
            res.send(data)
        }).catch(err => res.send(err))
}

exports.liked = (req, res) => {
    likes.findOne(
        {
            where:
            {
                userId: req.body.userId,
                eventId: req.body.eventId
            }
        })
        .then(data => {
            if (data) {
                res.send({ likes: true, data })
            } else {
                res.send({ likes: false, data })
            }
        }).catch(err => res.send(err))
}

exports.create = (req, res) => {
    likes.create(req.body)
        .then(data => {
            res.send(data)
        }).catch(err => res.send(err))
}

exports.destroy = (req, res) => {
    likes.destroy({
        where: { id: req.params.id }
    })
        .then(data => {
            res.send({message: "success delete data"})
        }).catch(err => res.send(err))
}